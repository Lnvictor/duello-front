/*
 * Send login information to server*/
function setAction(form) {
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    console.log(username, password)
    
    const request = new Request('http://localhost:8000/auth/login', {
        'method': 'POST', 
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': JSON.stringify({email: username, password: password})
    })
    let response =  fetch(request).then(
        (response) => {
            if (response.status != 200) {
                alert('Deu ruim mane')
            }
            response.json().then((value) => {
				var name = value.name
				var lastName = value.last_name
				var token = value.token
				var userId = value.user_id

				sessionStorage.setItem('userId', userId)
				sessionStorage.setItem('username', name)
				sessionStorage.setItem('lastName', lastName)
				sessionStorage.setItem('token', token)
				location.href = './home.html'
            })
        }
    )
    return false
}

function initialHome(){
	var nameLabel = document.getElementById("username_label")
	nameLabel.innerHTML = sessionStorage.getItem("username")
	retrieveCageByAuthor().then(
		(response) => {
			response.json().then((value) => {
				var foo = document.getElementsByClassName('cages_div')[0]
				foo.innerHTML = buildCagesPreview(value) 
			})
		}
	)
}

/*
 * Cages handlings functions
 * */

function retrieveCageByAuthor(){
	const authorId = sessionStorage.getItem('userId');
	var url = `http://localhost:8000/cage/cage/${authorId}`
	var options = {
		'method': 'GET',
		'headers': {
			'Authorization': `Bearer ${sessionStorage.getItem('token')}`
		}
	}
	const request = new Request(url, options)

	return fetch(request)
}

/**
 * Fazer funcao que build o HTML dos cages
 */
function buildCagesPreview(value){
	console.log(value)
	var title = value.title
	var description = value.description

	var htmlTxt = `<p>${title}</p><br>${description}`
	return htmlTxt
}

/**
 * 
 * Function that aims making the login form turns in signup form
 * 
 */

function signUpFormSetup(form){
	console.log('passou')
	var url = 'http://localhost:8000/auth/signup'
	var options = {
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
		},
		'body': JSON.stringify({
			user_name: form.username.value,
			user_last_name: form.last_name.value,
			user_email: form.email.value,
			password: form.password.value
		})
	}

	const request = new Request(url, options)
	var response = fetch(request).then(
		(response) => {
			console.log(response.status)
		}
	)
	location.href = './index.html'
	return false
}
