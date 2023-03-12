window.onload = () => {
  
  const content = document.querySelector('.content');
  const modal = document.querySelector('.modal-title');
  const inputTitle = document.querySelector('.input-title');
  const inputDescription = document.querySelector('.input-description');
  
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-modal
    if (event.target.classList.contains('btn-modal')) {
      // isi dari data-value element yang ditekan
      const type = event.target.dataset.type.toLowerCase();
      // ubah judul modal
      modal.textContent = `modal ${type} data`;
      // jika judul modal bertuliskan kata 'add'
      if (modal.textContent.includes('add')) clear();
    }
  });
  
  function clear() {
    // hilangkan semua value input
    inputTitle.value = '';
    inputDescription.value = '';
  }
  
  const submitButton = document.querySelector('.btn-submit');
  submitButton.addEventListener('click', () => {
    // cek judul modal
    if (modal.textContent.includes('add')) {
      // value input
      const title = inputTitle.value.trim();
      const description = inputDescription.value.trim();
      // validasi dahulu
      if (validate(title, description) == true) {
        // render element
        const result = render(title, description);
        // tampilkan element
        content.insertAdjacentHTML('afterbegin', result);
        // tampilkan pesan berhasil ditambahkan
        sweetalert('success', 'Success', 'data has been added!');
        // bersihkan value
        clear();
      }
    }
  });
  
  function sweetalert(icon, title, text, position = 'center') {
    // plugin sweetalert2
    swal.fire ({
      position: position,
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function validate(title, description) {
    // jika semua input kosong
    if (!title && !description) return sweetalert('error', 'Alert', `field's is empty!`);
    // jika masih ada input yang kosong
    if (!title || !description) return sweetalert('error', 'Alert', `field is empty!`);
    // jika judul terlalu pendek
    if (title.length < 3) return sweetalert('error', 'Alert', 'title must be more then 3 character');
    // jika judul terlalu panjang
    if (title.length > 150) return sweetalert('error', 'Alert', 'title must be less then 150 character');
    // jika deskripsi terlalu pendek
    if (description.length < 8) return sweetalert('error', 'Alert', 'description must be more then 8 character');
    // jika deskripsi terlalu panjang
    if (description.length > 400) return sweetalert('error', 'Alert', 'description must be less then 400 character');
    // jika berhasil melewati semua validasi
    return true;
  }
  
  function render(title, description) {
    return `
    <div class="col-md-4">
      <div class="card my-2">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <button class="btn btn-success btn-sm rounded-0 me-1 btn-modal btn-edit" data-type="edit" data-bs-toggle="modal" data-bs-target="#modalBox">edit</button>
          <button class="btn btn-danger btn-sm rounded-0 btn-delete">delete</button>
        </div>
      </div>
    </div>
    `;
  }
  
  // hapus data
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-delete
    if (event.target.classList.contains('btn-delete')) {
      // dapatkan element col-md-4
      const element = event.target.parentElement.parentElement;
      const col = element.parentElement;
      // jalankan fungsi deleteData()
      deleteData('do you want to delete this data?', col, true);
    }
  });
  
  function deleteData(text, element, del = false) {
    // plugin sweeralert
    swal.fire ({
      icon: 'info',
      title: 'Are You Sure?',
      text: text,
      showCancelButton: true
    }).then(response => {
      // jika menekan tombol ok atau yes
      if (response.isConfirmed) {
        // tampilkan pesan berhasil dihapus
        sweetalert('success', 'Success', 'data has been deleted!');
        // hapus element
        return (del == false) ? element.innerHTML = '' : element.remove();
      }
    });
  }
  
  // edit data 
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class btn-edit
    if (event.target.classList.contains('btn-edit')) {
      // dapatkan element card-body
      const element = event.target.parentElement.children;
      // dapatkan value dari element judul dan deskripsi di sebuah card
      const title = element[0].textContent;
      const description = element[1].textContent;
      // set value 
      setValue(title, description);
      // jalankan fungsi editData(element)
      editData(element);
    }
  });
  
  function setValue(title, description) {
    // set value pada input
    inputTitle.value = title;
    inputDescription.value = description;
  }
  
  function editData(param) {
    // ketika tombol submit ditekan
    submitButton.addEventListener('click', () => {
      // cek judul modal
      if (modal.textContent.includes('edit')) {
        // validasi lebih dahulu
        if (validate(param[0].textContent, param[1].textContent)) {
          // set judul baru dari value input title
          param[0].textContent = inputTitle.value.trim();
          // set deskripsi baru dari value input description
          param[1].textContent = inputDescription.value.trim();
          // tampilkan pesan berhasil diubah
          sweetalert('success', 'Success', 'data has been updated!');
          // set parameter param menjadi null supaya data lain tidak ter duplikat
          param = null;
        }
      }
    });
  }
  
  // hapus semua data 
  const deleteAllDataButton = document.querySelector('.btn-all');
  deleteAllDataButton.addEventListener('click', () => {
    if (content.innerHTML == '') return sweetalert('info', 'Alert', 'you haven\'t entered any data yet');
    // jalankan fungsi deleteData()
    deleteData('do you want to delete all data', content);
  });
  
}