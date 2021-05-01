import './App.css';
import * as Quill from 'quill'
import './quill_snow.css'
import React, { useState, useEffect } from 'react';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebrtcProvider } from 'y-webrtc'
import QuillCursors from 'quill-cursors'

import CodeMirror from "codemirror";
import { CodemirrorBinding } from "y-codemirror"
import './code_mirror_css.css'
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js"
import "codemirror/mode/python/python.js"

function App(id) {

    const ID = id.location.pathname
    const State = id.location.state
    let code_editor_cpp=null;
    let code_editor_javascript=null;
    let code_editor_python=null;

    function show_text_editor(){
      document.querySelector('#code_editor').style.display='none';
      document.querySelector('#text_editor').style.display='block';
      code_editor_cpp.refresh()
      code_editor_javascript.refresh()
      code_editor_python.refresh()
    }
    function show_code_editor(){
      document.querySelector('#text_editor').style.display='none'
      document.querySelector('#code_editor').style.display='block';
      code_editor_cpp.refresh()
      code_editor_javascript.refresh()
      code_editor_python.refresh()
    }

    function setCPP() {
      document.querySelector('#python_editor').style.display='none'
      document.querySelector('#javascript_editor').style.display='none'
      document.querySelector('#cpp_editor').style.display='block'
      code_editor_cpp.refresh()
    }
    function setJS() {
      document.querySelector('#cpp_editor').style.display='none'
      document.querySelector('#python_editor').style.display='none'
      document.querySelector('#javascript_editor').style.display='block'
      code_editor_javascript.refresh()
    }
    function setPython() {
      document.querySelector('#cpp_editor').style.display='none'
      document.querySelector('#javascript_editor').style.display='none'
      document.querySelector('#python_editor').style.display='block'
      // code_editor_python.refresh()
    }


    // useEffect(()=>
    // {
    //   const ydoc = new Y.Doc()
    //   const webrtcProviderK = new WebrtcProvider("Existing_Docs"+ID, ydoc)
    //   const ymap = ydoc.getMap("global_files")
    //   if(State===ID)
    //   {
    //     ydoc.transact(() => {
    //       ymap.set(ID, ID)
    //     })
    //     ymap.observe()
    //     console.log("Existed")
    //   }
    //   else
    //   {
    //     if(ymap.has(ID))
    //     {
    //       console.log("Existed")
    //     }
    //     else
    //     {
    //       console.log(ID)
    //       console.log(ymap.has(ID))
    //     }
    //   }
    // })


    const [quill, setQuill] = useState(null);


    useEffect(()=>{
      Quill.register('modules/cursors', QuillCursors)
      if(quill===null)
        setQuill(new Quill(document.querySelector('#text_box_editor'), {
            modules: {
                cursors:true,
                toolbar: [
                // adding some basic Quill content features
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
                ],
                history: {
                  userOnly: true
                }
            },
            placeholder: 'Start collaborating...',
            theme: 'snow' // 'bubble' is also great
        }))
        if(quill!=null)
        {
          const ydoc_text = new Y.Doc();
          const provider_text = new WebrtcProvider(ID+"TEXT", ydoc_text)
          const ytext_text = ydoc_text.getText('quill')
          const binding = new QuillBinding(ytext_text, quill, provider_text.awareness)
        }
    })

    useEffect(()=>{
        code_editor_cpp = new CodeMirror(document.querySelector("#cpp_editor_area"), {
        mode: "text/x-c++src",
        lineNumbers: true,
        autoRefresh: true
      });
      const ydoc_code_cpp = new Y.Doc();
      const provider_code_cpp = new WebrtcProvider(ID+"CODE_CPP", ydoc_code_cpp);
      const ytext_code_cpp = ydoc_code_cpp.getText("codemirror");
      new CodemirrorBinding(ytext_code_cpp, code_editor_cpp, provider_code_cpp.awareness);
      code_editor_cpp.refresh();

      code_editor_javascript = new CodeMirror(document.querySelector("#javascript_editor_area"), {
        mode: "javascript",
        lineNumbers: true,
        autoRefresh: true
      });
      const ydoc_code_JS = new Y.Doc();
      const provider_code_JS = new WebrtcProvider(ID+"CODE_JS", ydoc_code_JS);
      const ytext_code_JS = ydoc_code_JS.getText("codemirror");
      new CodemirrorBinding(ytext_code_JS, code_editor_javascript, provider_code_JS.awareness);
      code_editor_javascript.refresh();

      code_editor_python = new CodeMirror(document.querySelector("#python_editor_area"), {
        mode: "python",
        lineNumbers: true,
        autoRefresh: true
      });
      const ydoc_code_python = new Y.Doc();
      const provider_code_python = new WebrtcProvider(ID+"CODE_PYTHON", ydoc_code_python);
      const ytext_code_python = ydoc_code_python.getText("codemirror");
      new CodemirrorBinding(ytext_code_python, code_editor_python, provider_code_python.awareness);
      code_editor_python.refresh();
    })
  
  return (
    <div className="App">
      <div>
        <button onClick={show_text_editor}>Text Editor</button>
        <button onClick={show_code_editor}>Code Editor</button>
      </div>
      <div id="text_editor" style={{display:'block'}}>
        <div id="text_box_editor"/>
      </div>
      <div id='code_editor' style={{display:'none'}}>
        <div>
          <button onClick={setCPP}>C++</button>
          <button onClick={setJS}>JavaScript</button>
          <button onClick={setPython}>Python</button>
        </div>
        <div id='cpp_editor' style={{display:'block'}}>
          <h1>Mode : CPP</h1>
          <div id='cpp_editor_area'/>
        </div>
        <div  id='javascript_editor' style={{display:'none'}}>
          <h1>Mode : JavaScript</h1>
          <div id='javascript_editor_area'/>
        </div>
        <div id='python_editor' style={{display:'none'}}>
          <h1>Mode : Python</h1>
          <div id='python_editor_area'/>
        </div>
      </div>
    </div>
  );
}

export default App;
