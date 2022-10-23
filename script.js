window.addEventListener('DOMContentLoaded', () => {
  
  const modalTitle = document.querySelector('.modal-title');
  const content = document.querySelector('.content');
  
  // form
  const inputTitle = document.querySelector('.input-title');
  const inputDescription = document.querySelector('.input-description');
  
  const modalButton = document.querySelector('.modal-button');
  modalButton.addEventListener('click', () => {
    modalTitle.innerText = 'Add Data';
    clear();
  });
  
  const submitButton = document.querySelector('.submit-button');
  submitButton.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const description = inputDescription.value.trim();
    if (modalTitle.innerText.toLowerCase() == 'add data') {
      // lakukan validasi terlebih dahulu
      if (validateForm(title, description) == true) {
        const result = render(title, description);
        content.appendChild(result);
        sweetalert('success', 'Berhasil!', 'data berhasil ditambahkan');
        clear();
      }
    }
  });
  
  function clear() {
    inputTitle.value = '';
    inputDescription.value = '';
  }
  
  function sweetalert(icon, title, text, position = 'center') {
    swal.fire ({
      position: position,
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function validateForm(title, description) {
    if (!title && !description) return sweetalert('error', 'Kesalahan!', 'isi semua input terlebih dahulu!');
    if (!title || !description) return sweetalert('error', 'Kesalahan!', 'isi input yang masih kosong terlebih dahulu!');
    if (title.length < 3) return sweetalert('error', 'Kesalahan!', 'judul terlalu pendek!');
    if (description.length < 3) return sweetalert('error', 'Kesalahan!', 'deskrpsi terlalu pendek!');
    if (title.length > 80) return sweetalert('error', 'Kesalahan!', 'judul terlalu paniang!');
    if (description.length > 300) return sweetalert('error', 'Kesalahan!', 'deskripsi terlalu paniang!');
    return true;
  }
  
  function render(title, description) {
    const column = html('div', 'col-md-6');
    const card = html('div', 'card m-1');
    const cardBody = html('div', 'card-body');
    
    const h3 = html('h3', 'fw-normal my-auto', title, true);
    cardBody.appendChild(h3);
    
    const p = html('p', 'fw-light my-auto', description, true);;
    cardBody.appendChild(p);
    
    const today = html('p', 'fw-light my-2', setDates(), true);
    cardBody.appendChild(today);
    
    const flex = html('div', 'd-flex justify-content-end my-auto');
    const edit = html('button', 'btn', 'edit', true);
    edit.setAttribute('data-bs-toggle', 'modal');
    edit.setAttribute('data-bs-target', '#exampleModal');
    edit.addEventListener('click', function() {
      modalTitle.innerText = 'Edit Data';
      editData(this);
    });
    flex.appendChild(edit);
    
    const del = html('button', 'btn', 'delete', true);
    del.addEventListener('click', () => deleteData(card));
    flex.appendChild(del);
    
    cardBody.appendChild(flex);
    card.appendChild(cardBody);
    column.appendChild(card);
    
    return column;
  }
  
  function html(elementname, classname, value, show = false) {
    const element = document.createElement(elementname);
    element.className = !classname ? '' : classname;
    if ( show == true ) {
      element.innerText = value;
      return element;
    }
    return element;
  }
  
  function deleteData(card) {
    swal.fire ({
      icon: 'warning',
      title: 'Yakin?',
      text: 'apakah anda yakin ingin menghapus data tersebut?',
      showCancelButton: true,
      cancelButtonText: 'tidak',
      confirmButtonText: 'yakin'
    }).then(result => {
      if (result.isConfirmed) {
        card.remove();
        sweetalert('success', 'Berhasil!', 'data berhasil dihapus!');
      }
    });
  }
  
  function setDay(number) {
    switch (number) {
      case 0 : return 'Sunday';
      case 1 : return 'Monday';
      case 2 : return 'Tuesday';
      case 3 : return 'Wednesday';
      case 4 : return 'Thursday';
      case 5 : return 'Friday';
      case 6 : return 'Saturday';
      default : return 'error to set day!';
    }
  }
  
  function setMonth(number) {
    switch (number) {
      case 0 : return 'January';
      case 1 : return 'February';
      case 2 : return 'March';
      case 3 : return 'April';
      case 4 : return 'May';
      case 5 : return 'June';
      case 6 : return 'July';
      case 7 : return 'August';
      case 8 : return 'September';
      case 9 : return 'October';
      case 10 : return 'November';
      case 11 : return 'December';
      default : return 'error to set month!';
    }
  }
  
  function setDates() {
    // set date
    const day = setDay(new Date().getDay());
    const date = new Date().getDate();
    const month = setMonth(new Date().getMonth());
    const year = new Date().getFullYear();
    
    return `${day}, ${month} ${date} ${year}`;
  }
  
  function editData(param) {
    const parent = param.parentElement.parentElement; // card body
    // tentukan element
    let h3 = parent.firstElementChild;
    let p = h3.nextElementSibling;
    let date = p.nextElementSibling;
    // input
    inputTitle.value = h3.innerText;
    inputDescription.value = p.innerText;
    // input
    const title = inputTitle.value.trim();
    const description = inputDescription.value.trim();
    // ketika tombol submit diteka
    submitButton.addEventListener('click', () => {
      if (modalTitle.innerText.toLowerCase() == 'edit data') {
        // validasi terlebih dahulu
        if (validateForm(inputTitle.value, inputDescription.value) == true) {
          h3.innerText = inputTitle.value;
          p.innerText = inputDescription.value;
          date.innerText = setDates();
          
          // set ke null, supaya tidak menduplikat data lain saat ingin mengedit data
          h3 = '';
          p = '';
          date = '';
          
          sweetalert('success', 'Berhasil!', 'data berhasil diubah');
        }
      }
    });
  }
  
});
