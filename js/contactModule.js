export let rendeContatSection = () => {
  let sectionContent = 
    `<section id="contactSection">
        <div class="container px-5">
          <div class="row align-content-center text-center h-100">
            <h2 class="mb-5 pb-2">Contact Us...</h2>
            <form class="row w-75 m-auto">
              <div class="col-md-6 mb-2">
                <input type="text" name="name" id="nameInput" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger d-none" role="alert">
                  Special Characters and Numbers not allowed
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <input type="email" name="email" id="emailInput" class="form-control" placeholder="Enter Email">
                <div id="emailAlert" class="alert alert-danger d-none" role="alert">
                  Please Enter valid email. *Ex: xxx@yyy.zzz
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <input type="tel" name="phone" id="phoneInput" class="form-control" placeholder="Enter Phone">
                <div id="phoneAlert" class="alert alert-danger d-none" role="alert">
                  Please Enter valid Phone Number
                </div>               
              </div>
              <div class="col-md-6 mb-2">
                <input type="number" name="age" id="ageInput" class="form-control" placeholder="Enter Age">
                <div id="ageAlert" class="alert alert-danger d-none" role="alert">
                  Please Enter valid Age
                </div> 
              </div>
              <div class="col-md-6 mb-2">
                <input type="password" name="password" id="passwordInput" class="form-control" placeholder="Enter Password">
                <div id="passwordAlert" class="alert alert-danger d-none" role="alert">
                   Please Enter valid password *Minimum 8 characters, at least one letter and one number:*
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <input type="password" name="re-password" id="repasswordInput" class="form-control" placeholder="enter RePassword">
                <div id="repasswordAlert" class="alert alert-danger d-none" role="alert">
                  Password & RePassword must be matched
                </div>
              </div>
              <div>
                <button id="submitBtn" class="btn btn-outline-danger my-2 px-3 py-2" disabled>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>`;
  document.querySelector('main').innerHTML = sectionContent; 

  // Handle Keyup Event on Inputs
  pressInputEvent();
}

let pressInputEvent = () => {
  // Name Input Event
  document.querySelector('#nameInput').addEventListener('keyup', function() { 
    let regex = /^[a-zA-Z]{1,30}$/,
        alert = document.querySelector('#nameAlert');
    checkValidation(this, regex, alert);
  });

  // Email Input Event
  document.querySelector('#emailInput').addEventListener('keyup', function() {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        alert = document.querySelector('#emailAlert');
    checkValidation(this, regex, alert);
  });

  // Phone Input Event
  document.querySelector('#phoneInput').addEventListener('keyup', function() {
    let regex = /^01[0125][0-9]{8}$/,
        alert = document.querySelector('#phoneAlert');
    checkValidation(this, regex, alert);
  });

  // Age Input Event
  document.querySelector('#ageInput').addEventListener('keyup', function() { 
    let regex = /^[1-9][0-9]?$/,
        alert = document.querySelector('#ageAlert');
    checkValidation(this, regex, alert);
  });

  // Password Input Event
  document.querySelector('#passwordInput').addEventListener('keyup', function() {
    let regex = /^(?=.*[0-9])(?=.*[a-z])([a-z0-9_-]+){8,}$/,
        alert = document.querySelector('#passwordAlert');
    checkValidation(this, regex, alert);
  });

  // RePassword Input Event
  document.querySelector('#repasswordInput').addEventListener('keyup', function() {
    let alert = document.querySelector('#repasswordAlert'),
        passwordInput = document.querySelector('#passwordInput');
    if(this.value !== passwordInput.value) {
      handleValidationStyle(this, alert, 'invalid');
    }else {
      handleValidationStyle(this, alert, 'valid');
    }
    checkSubmitAction();
  });
}

let checkValidation = (input, regex, alert) => {
  if(!input.value.match(regex)) {
    handleValidationStyle(input, alert, 'invalid');
  }else {
    handleValidationStyle(input, alert, 'valid');
  }
  checkSubmitAction();
}

let handleValidationStyle = (input,alert,valid) => {
  if(valid == 'invalid') {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
  }else {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    alert.classList.remove('d-block');
    alert.classList.add('d-none');
  }
}

let checkSubmitAction = () => {
  let inputs = Array.from(document.querySelectorAll('input')),
      submitBtn = document.querySelector('#submitBtn');

  inputs.filter(input => input.classList.contains('is-valid')).length == inputs.length ? 
    submitBtn.disabled = false : submitBtn.disabled = true;
}