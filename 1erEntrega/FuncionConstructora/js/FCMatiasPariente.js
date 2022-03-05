function Usuario(nombre,apellido){ // genero los atributos 
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros= [];
        this.mascotas= [];
    }
    Usuario.prototype.getFullName = function () { //retorno como string nombre y apellido juntos
        return `${this.nombre} ${this.apellido}`
    }

    Usuario.prototype.addMascota = function(mascotas){ // agrego al array la mascota
        this.mascotas.push(mascotas);
    }

    Usuario.prototype.getMascotas = function (){ // retorno la cantidad de elementos del array de mascotas
       return(this.mascotas.length);
    }

    Usuario.prototype.addBook = function ({book,autor}) { // agrego al array el libro ingresado
        let libroRecibido = {
            book,
            autor
        }
        this.libros.push(libroRecibido);
    }

    Usuario.prototype.getBooks = function () { // mapeo solo el nombre del libro y lo retorno
        let libroProcesado = this.libros.map(member=>{
            return member.book;
        })
        return libroProcesado;
    }

// verificacion de funcionamiento 
let usuario = new Usuario ('Matias','Pariente');
console.log(usuario.getFullName());
usuario.addMascota(["Tom"]);
console.log(usuario.getMascotas());
usuario.addMascota(["Mora"]);
console.log(usuario.getMascotas());
usuario.addMascota(["Rita"]);
usuario.addMascota(["Lolo"]);
console.log(usuario.getMascotas());
usuario.addBook({book:"La Rayuela", autor:"Julio Cortazar"});
usuario.addBook({book:"1984", autor:"George Orwell"});
console.log(usuario.getBooks());