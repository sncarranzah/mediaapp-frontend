/*1.1 Creación de proyecto frontend y consumo de API REST :: Esta es la clase DTO del frontend que va a traer la data desde el
backend hasta aqui, asi que debe de ser compatible (tener los mismos nombres de atributos y las clases respectivas compatibles) 
con la clase DTO patient del backend. Se usa la palabra reservada export para establecer que esta clase
va a poder ser usada (importada) en otro modulo. Ademas, para que el compilador no t exija inicializar los atributos de la clase
al momentos de ser declarados, se puede fijar a false el campo strict del archivo tsconfig.json .*/
export class Patient
{
    idPatient : number;
    firstName : string;
    lastName : string;
    dni : string;
    address : string;
    phone : string;
    email : string;
}