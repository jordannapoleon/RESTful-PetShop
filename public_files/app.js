
    fetch('http://localhost:5050/api/pets')
     .then(result => {
        console.log(result)
     })
    .catch (err => {
        console.log(err);
    })

    