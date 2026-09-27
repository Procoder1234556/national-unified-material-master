import './main-v4-CKNFKWc8.js';
var e = document.getElementById('dz');
(['dragenter', 'dragover'].forEach(r =>
  e.addEventListener(r, r => {
    (r.preventDefault(), e.classList.add('over'));
  })
),
  ['dragleave', 'drop'].forEach(r =>
    e.addEventListener(r, r => {
      (r.preventDefault(), e.classList.remove('over'));
    })
  ));
