import React, { Component } from 'react';

export default function uploadMaterialfile() {
    return (
        <>
        <div>
        <h1 class="title">Mongo File Uploads</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <label class="file-label">
              <input class="file-input" type="file" name="file" id="file"/>
              <span class="file-cta">
                <span class="file-icon"><i class="fas fa-upload"></i></span>
                <span class="file-label">Choose a file…</span>
              </span>
            </label>
          <input class="button is-link" type="submit" value="Submit"/>
        </form>
        </div>
        </>
    )
}