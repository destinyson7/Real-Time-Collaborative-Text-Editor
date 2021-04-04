import './App.css';
import * as Quill from 'quill'
import './quill_snow.css'
import React, { useState, useEffect } from 'react';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebrtcProvider } from 'y-webrtc'
import QuillCursors from 'quill-cursors'

function App(id) {

    const ID = id.location.pathname
    useEffect(()=>{
        Quill.register('modules/cursors', QuillCursors)
        const quill=new Quill(document.querySelector('#editor'), {
            modules: {
                cursors:true,
                toolbar: [
                // adding some basic Quill content features
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
                ],
                history: {
                // Local undo shouldn't undo changes
                // from remote users
                userOnly: true
                }
            },
            placeholder: 'Start collaborating...',
            theme: 'snow' // 'bubble' is also great
        })
        console.log(id)
        const ydoc = new Y.Doc()
        const provider = new WebrtcProvider(ID, ydoc)
        const ytext = ydoc.getText('quill')
        const binding = new QuillBinding(ytext, quill, provider.awareness)
    })

  
  return (
    <div className="App">
      <div id="editor" />
    </div>
  );
}

export default App;
