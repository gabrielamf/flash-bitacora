(function begin() {
  $('.modal').modal();
})();

// Funcion fecha
const timeDate = () => {
  let f = new Date();
  let time = f.getHours() + ':' + f.getMinutes();
  let timeAbsolute = '';

  if (f.getHours() <= 12) {
    timeAbsolute = time + ' AM';
  } else {
    timeAbsolute = time + ' PM';
  }
  return timeAbsolute;
};
// -------------- POST --------------- //
// Agrega post con fecha
function post() {
  const postTemplate = 
  `<div class="col s6 boxMessage">
    <div class="title-post rosado">
      <p class="left-align">${$('.post-header input').val()}</p>
    </div>
    <div class="">
      <p class="contenido-post">${$('#texto').val()}</p>
    </div>
    <div class="right-align">
      <span class=" morado">${timeDate()}</span>
    </div>
  </div>`;
  $('#post').prepend(postTemplate);
  $('.post-header input').val(' ');
  $('#texto').val(' ');
}

// Modal post
$('#post-modal').on('click', () => {
  $('#post-modal').addClass('waves-effect waves-light modal-trigger');

  const modalPostContent =
    `<div class="row">
      <div class="post-header">
        <input type="text" placeholder="title-post" class="title-post post-header" autofocus>
      </div>
      <textarea name="text" id="texto" class="textarea-height" placeholder="¿Qué estás pensando?" type="text"></textarea>
    </div>`;
  const modalPostFooter = 
    `<a id="btn-post" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat purple lighten-3 white-text">
      <i class="material-icons right">send</i>Public
    </a>`;
  $('.modal-content').html(modalPostContent);
  $('.modal-footer').html(modalPostFooter);

  $('#btn-post').on('click', post);
});

$('#btn-post').on('click', post);

// -------------- EVENTO DIA --------------- //
function date() {
  function success(position) {
    let pos = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
      
    const dateEstructure = `<div class="boxMessage z-depth-5 col l5">
      <div class="title"><h5 class="center-align">${$('#modal1 .post-header').val()}</h5></div>
      <div class="">
      <p class="">${'Date of event: ' + $('input.datepicker').val()}</p>
      <p class="">${'Hour: ' + $('input.timepicker').val()}</p>
      </div>
      <div><img class="col l12" src="${'http://maps.googleapis.com/maps/api/staticmap?center=' + pos.lat + ',' + pos.long + '&zoom=13&size=300x300&sensor=false'}"></div>
      <div class="right-align"><span class="">${timeDate()}</span></div>
      </div>`;
    $('#post').prepend(dateEstructure);
    $('#modal3 .post-header').val(' ');
    $('input.datepicker').val(' ');
    $('input.timepicker').val(' ');
  };
  
  function error() {
    alert('Tenemos un problema con la ubicación');
  };

  navigator.geolocation.getCurrentPosition(success, error);    
}

// Modal date 
$('#date-modal').on('click', function() {
  $('#date-modal').addClass('waves-effect waves-light modal-trigger');
  $('.modal').addClass('height');

  const modalDateTemplate = 
  `<div class="row">
    <div class="col offset-l4">
        <input type="text" name="" value="" placeholder="Title of event" class="title post-header" autofocus>
        </div>
      <div class="col l10 offset-l2">
          <div class="col l5">
            <label for="input_text">Date</label>
            <input type="text" class="datepicker"> 
          </div>
          <div class="col l5">
                <label for="input_text">Hours</label>
              <input type="text" class="timepicker">
          </div>
      </div>
  </div>`;
  const modalDateFooterTemplate = `<a id="btn-date" href="#!" class="modal-action modal-close waves-effect btn-flat purple lighten-3 white-text">
  <i class="material-icons right">send</i>Public</a>`;

  $('.modal-content').html(modalDateTemplate);
  $('.modal-footer').html(modalDateFooterTemplate);
  $('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15, 
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false 
  });

  $('.timepicker').pickatime({
    default: 'now',
    fromnow: 0, 
    twelvehour: false, 
    donetext: 'OK', 
    cleartext: 'Clear', 
    canceltext: 'Cancel', 
    autoclose: false,
    ampmclickable: true, 
    aftershow: function() { } 
  });
  $('#btn-date').on('click', date);
});
function clearInput() {
  localStorage.url = '';
  $('.file-path').val('');
  localStorage.type = '';
}

function playAudioAndVideo(file, type) {
  url = URL.createObjectURL(file);
  localStorage.url = url;
  localStorage.type = type;
}

function format() {
  let fileMA = this.files[0];
  let type;

  if (fileMA.type.match('audio.*')) {
    type = 'audio';
    playAudioAndVideo(fileMA, type);
  } else if (fileMA.type.match('video.*')) {
    type = 'video';
    playAudioAndVideo(fileMA, type);
  } else {
    alert('Solo se permite formatos de audio y video');
  }
};


// -------------- IMAGE --------------- //
function img() {
  let imagen = $('#img-guardar');

  const imgTemplate = `<div class="boxMessage z-depth-5 col s12">
  <img src="${imagen[0].src}" class="col s12 imagen"></img>
  <div class="right-align"><span class="">${timeDate()}</span></div>
  </div>`;
  $('#post').prepend(imgTemplate);
}

function previewImage() {
  let file = (this.files[0].name).toString();
  let reader = new FileReader();

  reader.onload = function(e) {
    $('#modal1 img').attr('src', e.target.result);
  };
  reader.readAsDataURL(this.files[0]);
};

// Modal image
$('#img-modal').on('click', function() {
  $('#img-modal').addClass('waves-effect waves-light modal-trigger');
  $('.modal').addClass('modal-photo');
  const modalImgTemplate =
  `<div class="center">
        <h6 class="title-post">Elige la imagen que deseas publicar</h6>
    </div>
    <form action="#">
        <div class="file-field input-field">
            <div class="btn pink lighten-4">
                <i class="material-icons">linked_camera</i>
                <input id="file-select" type="file" multiple>
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="Elige un photo">
            </div>
        </div>
    </form>
    <figure class="center">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzEiIGhlaWdodD0iMTgwIj48cmVjdCB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2VlZSI+PC9yZWN0Pjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijg1LjUiIHk9IjkwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MTcxeDE4MDwvdGV4dD48L3N2Zz4="
            alt="Previsualizacion Imagen" id="img-guardar" class="responsive-img post-img">
    </figure>`;

  const modalImgFooterTemplate = `<a id="btn-img" class="modal-action modal-close waves-effect btn-flat purple lighten-3 white-text">
  <i class="material-icons right">send</i>Public</a>`;

  $('.modal-content').html(modalImgTemplate);
  $('.modal-footer').html(modalImgFooterTemplate);

  // Preview Image
  $('input[type=file]').change(previewImage);
  $('#btn-img').on('click', img);
});


