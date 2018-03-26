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
    editor = atom.workspace.getActiveTextEditor();
    if (editor){
      temppath = editor.getPath();
      if (temppath) {
        atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
      } else {
        tempBuffer = editor.getBuffer();
        fileName = tempBuffer.lineForRow(tempBuffer.nextNonBlankRow(0)).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase() 
        tempBuffer.setPath(this.savepath + "/" + fileName);
        atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
        tempBuffer.setPath(null);
      } 
    }
  },

  smartSave() {
    editor = atom.workspace.getActiveTextEditor();
    if (editor){
      temppath = editor.getPath();
      if (temppath) {
        editor.getBuffer().save();
      } else {
        tempBuffer = editor.getBuffer();
        fileName = tempBuffer.lineForRow(tempBuffer.nextNonBlankRow(0)).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase(); 
        
        tempBuffer.setPath(this.savepath + "/" + fileName);
        atom.commands.dispatch(atom.views.getView(editor), 'core:save-as');
        tempBuffer.setPath(null);
      }   
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
    
    this.savePath(this);
  
  },

  deactivate() {
    this.subscriptions.dispose();
  }


  
  // callbackfunction() {
  //   alert("hello");
  // }

};
