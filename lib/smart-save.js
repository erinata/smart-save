'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  savepath: "",

  savePath(s) {
    if ( atom.workspace.getActiveTextEditor()){
      temppath = atom.workspace.getActiveTextEditor().getPath();
      if (temppath) {
          s.savepath = path.dirname(temppath);
      }
    }
  },
  
  smartSaveAs() {
    // alert(this.savepath);
    temppath = atom.workspace.getActiveTextEditor().getPath();
    if (temppath) {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'core:save-as');
    } else {
      // alert(this.savepath);
      atom.workspace.getActiveTextEditor().getBuffer().setPath(this.savepath + "/untitled");
      
      // this.savehandle = atom.commands.onDidDispatch(savecallback)
      // 
      // this.subscriptions.add( atom.commands.onDidDispatch(({item}) => this.savecallback(item, this)));
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'core:save-as');
      
      if (atom.workspace.getActiveTextEditor().getBuffer().getPath() == (this.savepath + "/untitled")) {
        atom.workspace.getActiveTextEditor().getBuffer().setPath(null);
      }      
    }
  },

  smartSave() {
    // alert(this.savepath);
    temppath = atom.workspace.getActiveTextEditor().getPath();
    if (temppath) {
      atom.workspace.getActiveTextEditor().getBuffer().save();
      // atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'core:save');
      
    } else {
	
      // alert(this.savepath);
      atom.workspace.getActiveTextEditor().getBuffer().setPath(this.savepath + "/untitled");
      
      // this.savehandle = atom.commands.onDidDispatch(savecallback)
      // 
      // this.subscriptions.add( atom.commands.onDidDispatch(({item}) => this.savecallback(item, this)));
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'core:save-as');
      
      if (atom.workspace.getActiveTextEditor().getBuffer().getPath() == (this.savepath + "/untitled")) {
        atom.workspace.getActiveTextEditor().getBuffer().setPath(null);
      }      
    }
  },
// 
  
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'smart-save:smart-saveto': () => this.smartSave()
    }));
    
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'smart-save:smart-saveas': () => this.smartSaveAs()
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
