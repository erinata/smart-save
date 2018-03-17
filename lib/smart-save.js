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
  
  smartSave() {
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
      
      
      // if (atom.workspace.getActiveTextEditor().getBuffer().isModified()) {
      //   this.savepath = null;
      // }
      
    }
    



  },

// 
  
  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'smart-save:smart save': () => this.smartSave()
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
