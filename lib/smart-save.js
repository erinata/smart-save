'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  savepath: "",

  savePath(s) {
    editor = atom.workspace.getActiveTextEditor();
    if (editor){
      temppath = editor.getPath();
      if (temppath) {
          s.savepath = path.dirname(temppath);
      }
    }
  },
  
  smartSaveAs() {
    // alert(this.savepath);
    temppath = atom.workspace.getActiveTextEditor().getPath();
    if (temppath) {
      editor = atom.workspace.getActiveTextEditor();
      atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
    } else {
      // alert(this.savepath);
      editor = atom.workspace.getActiveTextEditor();
      tempBuffer = editor.getBuffer();
      fileName = tempBuffer.lineForRow(tempBuffer.nextNonBlankRow(0)); 
      tempBuffer.setPath(this.savepath + "/" + fileName);
      
      // this.savehandle = atom.commands.onDidDispatch(savecallback)
      // 
      // this.subscriptions.add( atom.commands.onDidDispatch(({item}) => this.savecallback(item, this)));
      atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
      
      // if (atom.workspace.getActiveTextEditor().getBuffer().getPath() == (this.savepath + "/untitled")) {

      tempBuffer.setPath(null);
      // }      
    }
  },

  smartSave() {
    // alert(this.savepath);
    temppath = atom.workspace.getActiveTextEditor().getPath();
    if (temppath) {
      editor = atom.workspace.getActiveTextEditor();
      editor.getBuffer().save();
      // atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'core:save');
      
    } else {
	
      // alert(this.savepath);
      editor = atom.workspace.getActiveTextEditor();
      tempBuffer = editor.getBuffer();
      fileName = tempBuffer.lineForRow(tempBuffer.nextNonBlankRow(0)); 
      
      tempBuffer.setPath(this.savepath + "/" + fileName);
      
      // this.savehandle = atom.commands.onDidDispatch(savecallback)
      // 
      // this.subscriptions.add( atom.commands.onDidDispatch(({item}) => this.savecallback(item, this)));
      atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
      
      // if (atom.workspace.getActiveTextEditor().getBuffer().getPath() == (this.savepath + "/untitled")) {
        tempBuffer.setPath(null);
      // }      
    }
  },
// 
  
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'smart-save:smart-save': () => this.smartSave()
    }));
    
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'smart-save:smart-save-as': () => this.smartSaveAs()
    }));
    
    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(() => this.savePath(this)));
    // this.subscriptions.add(atom.workspace.getActivePane().onDidChangeActiveItem(() => this.savePath(this)));
    
    this.savePath(this);
  
  },

  deactivate() {
    this.subscriptions.dispose();
  }


  
  // callbackfunction() {
  //   alert("hello");
  // }

};
