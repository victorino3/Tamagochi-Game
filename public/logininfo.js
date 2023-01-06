

let y = 0;
function bckg() {
  background(bg);

  stroke(226, 204, 0);
  line(0, y, width, y);

  y++;
  if (y > height) {
    y = 0;
  }
}

function Register() {
  let username = inputun.value();
  let password = inputpass.value();
  removeElements();
  if(!username || !password) {
    alert("Username and Passowrd is required")
  }else{
    console.log(imagem)
    checkUsernameTOregister(username,password,imagem)
  }
}

function login() {
  let username = inputun.value();
  let password = inputpass.value();
  removeElements();
  if(!username || !password) {
    alert("Username and Passowrd is required")
  }else {
    checkUsername(username,password)
  }
}

function checkUsername(username,password){
  let data = {
    username,
    password,
    }
    httpPost("/login","json",data,(response)=>{
      //console.log("response: ", response)
      let imageFromback = response.message
      dbImage = imageFromback
      preload(dbImage)
      getdata()
      
      //console.log(imagedb)
      if(response) creatorLogin = true;
      
       
    }) 
} 

function checkUsernameTOregister(username, password,imagem) {
  let data = {
  username,
  password,
  imagem
  }

  httpPost("/register","json",data,(response)=>{
    if(response) creatorLogin = true;
    getdata()
  })  
}

/**
 * function ramdomImage (file_path) {
    let data = fs.readdirSync(file_path, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
    });
    return data
}
 */
