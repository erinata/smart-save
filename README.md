# Smart Save

This package set the path of the untitled buffer to the path of the last file viewed. In other words, it behaves like Sublime Text. 

## Basics

The default behaviour of "Save" and "Save As" in Atom editor is really annoying. It saves the file at the root of the project. The Smart Save package will set the path of an unsaved buffer according to the path of the last file the editor was focusing on. This behaviour is inspired by the Sublime Text editor. There are still some glitches, but I try to mimic the behaviour as close as possible.

If the untitled buffer is it not empty, the package will use the text in the first row as the filename.


## Default Keymap

By default this package will override the original keymap for "Core: Save" and "Core: Save As"( "cmd+s", "shift+cmd+s" for Mac and "ctrl-s","ctrl-shift-s" for Windows and Linux ). You can remap the keymap if you need the original commands.
