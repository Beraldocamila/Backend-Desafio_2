import fs from 'fs';

const prod = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));
const prodJson = 'productos.json';


class Contenedor{

    constructor(products){
        this.arrayProducts = products;
    }

    async write(dato){
        const newProduct = JSON.stringify(dato, null, 2);
        await fs.promises.writeFile(prodJson, newProduct, 'utf-8');
    }

    async save (object){

        try{
            const productsJson = JSON.parse(await fs.promises.readFile(prodJson, 'utf-8'));
            const arrayProducts = productsJson;
            arrayProducts.push(object);

            arrayProducts.forEach(element => { if (element.id > id)  id = element.id});

            object.id = id +1;
            await fs.promises.writeFile(prodJson, JSON.stringify(arrayProducts, null, 2));

        }catch(err){
            console.log(err);
        }
    }

    async getById(numberId){
        try{
            const info = JSON.parse(await fs.promises.readFile(prodJson, 'utf-8'));
            this.arrayProducts = info;
            const product= this.arrayProducts.find((product) => product.id ===numberId);
            if (product){
                console.log(product);
            }else{
                console.log('there is no product');
            }
        }catch(err){
            console.log(err)
        }

    }

    async getAll(){

        const data = await fs.promises.readFile(prodJson);
        const products = JSON.parse(data);

        if (products.length){
            const allProducts = products.map((product) =>  product);
            console.log(allProducts);
        }else{
            console.log('there is no products');
        }
    }

    async deleteById(numberId){
        try{
            const data = await fs.promises.readFile(prodJson);
            this.arrayProducts = JSON.parse(data);

            const find = this.arrayProducts.find( (product) => product.id === numberId ? true : false) 
            if (find !== -1){
                this.arrayProducts.splice(data, 1);
                this.write(this.arrayProducts);
            }
        }catch(err){console.log(err)}
    }

    async deleteAll(){
        try{
            const data = JSON.parse(await fs.promises.readFile(prodJson,'utf-8'));
            if (data.length){
                this.write([]);
            }
        }catch (err){
            console.log(err);
        }
    }

    async createText(){
        try{
            const data = await fs.promises.readFile(prodJson,'utf-8');
            this.arrayProducts = JSON.parse(data);
            const newText = fs.promises.writeFile('./products.txt', JSON.stringify(this.arrayProducts, null, 2));
            return newText;
        }catch(err){
            console.log(err);
        }

    }
}

const products = new Contenedor (prod);

const first_product={
    title: 'Computer',
    price: '$60.000', 
    thumbnail: 'https://ar-media.hptiendaenlinea.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/3/1/310G4LA-1_T1643307273.png'
}

const second_product={
    title: 'Television',
    price: '$70.000',
    thumbnail: 'http://medias.musimundo.com/medias/00431006-144267-144267-01-144267-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w3OTI5NHxpbWFnZS9qcGVnfGhlZi9oNDQvMTAzODA5MzUyOTkxMDIvMDA0MzEwMDYtMTQ0MjY3LTE0NDI2N18wMS0xNDQyNjdfMDEuanBnX3NpemU1MTV8Y2JlZTFkMjZjZDFiMDUyNmUxZjNkZTQwZTEwZjZmODg4ZmJkZGVkMWIzOGI4ZDAyNzYwNGJkYWMwYWU1ZTAwMA'
}

const third_product={
    title: 'Watch',
    price: '$15.000',
    thumbnail:'https://stylewatch.vtexassets.com/arquivos/ids/210880-800-auto?width=800&height=auto&aspect=true'
}

products.save(first_product);
products.save(second_product);
products.save(third_product);

products.createText();