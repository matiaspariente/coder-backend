import knex from "knex";

export default class ContenedorMongo{ // contenedor Archivos
    constructor(options,collection){
        this.collection = collection;
        this.knexcon = knex(options)
    }

    async  leerMariadb(){
        try{
            this.knexcon.from(this.collection).select('*')
             .then((content)=>{
                if (!content) return [];
                return content;
             })
             .finally(()=>{
                this.knexcon.destroy();
            });   
        }
        catch (error){
            console.log(error);
        }
    }

    async agregarMariadb(content){
        try {
            this.knexcon(this.collection).insert(content)
             .finally(()=>{
                this.knexcon.destroy();
                return "element insert"
            }); 

        } catch (error) {
            console.log(error);
        }
    }

    async modificarMariadb(content,id){
        try {
            this.knexcon.from(this.collection).where('id',id).update(content)
            .finally(()=>{
                this.knexcon.destroy();
                return "table updated"
            });
        } catch (error) {
            console.log(error);
        }
    }

    async borrarMariadb(id){
        try {
            this.knexcon.from(this.collection).where('id',id).del()
            .finally(()=>{
                this.knexcon.destroy();
                return "element delete"
            });
        } catch (error) {
            console.log(error);
        }
    }
}    