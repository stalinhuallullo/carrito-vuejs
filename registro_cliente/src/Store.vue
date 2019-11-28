
<template>
    <div id="app">
        
        <header>
            <div class="container text-right">
                <!-- <a href="#card" class="btn-carrito"><span>(0)</span> Carrito</a> -->
                <a href="javascript:void(0)" class="btn btn-warning mr-15" @click="mostrarProductos()">Seguir comprando</a>
                <a href="javascript:void(0)" class="btn btn-primary" @click="mostrarCarrito()"><span v-text="mostrarCantidadDeCarrito">(0)</span> Carrito</a>
            </div>
        </header>
        
        <div class="container">
            <div class="row">
                
                <div v-if=" modoTienda == 'productos' ">
                    <div class="col-md-3">
                        <div class="row">
                            <h2 class="col-md-12 text-left mt-0">Filtro de productos</h2>
                            <br>
                            <div class="col-md-12 text-left">
                                <p class="text-left mt-15">Categorias</p>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="pants"><input type="checkbox" name="category" id="pants" value="1" v-model="category" @change="filter()"> Pantalon</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="divers"><input type="checkbox" name="category" id="divers" value="2" v-model="category" @change="filter()"> Buzos</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="poles"><input type="checkbox" name="category" id="poles" value="3" v-model="category" @change="filter()"> Polos</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="shoes"><input type="checkbox" name="category" id="shoes" value="4" v-model="category" @change="filter()"> Zapatos</label>
                            </div>

                            <br>
                            <div class="col-md-12 text-left">
                                <p class="text-left mt-15">Genero</p>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="man"><input type="checkbox" name="gender" id="man" value="2" v-model="gender" @change="filter()"> Hombre</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="woman"><input type="checkbox" name="gender" id="woman" value="1" v-model="gender" @change="filter()"> Mujer</label>
                            </div>
                            
                            
                            <div class="col-md-12 text-lef">
                                <p class="text-left mt-15">Precio</p>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="price1"><input type="radio" name="price" id="price1" value="1" v-model="price" @change="filter()"> S/ 0.00 a S/ 10.00</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="price2"><input type="radio" name="price" id="price2" value="2"  v-model="price" @change="filter()"> S/ 10.00 a S/ 15.00</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="price3"><input type="radio" name="price" id="price3" value="3"  v-model="price" @change="filter()"> S/ 15.00 a más</label>
                            </div>
                            <div class="col-md-12 text-left">
                                <label for="price4"><input type="radio" name="price" id="price4" value="4"  v-model="price" @change="filter()"> Todos</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row">

                            <div class="col-md-3 mb-15" 
                                v-for="item in listProduct"
                                :key="item._id">
                                <div class="card">
                                    <img class="mt-15" v-bind:src=" getUrlImage(item.image) " alt="">
                                    <div class="content">
                                        <h4 class="title" v-text="item.name"></h4>
                                        <p><strong v-text=" 'S/ ' + item.price.toFixed(2)"></strong></p>
                                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <button class="btn btn-danger mb-15" @click="btnComprar(item)">Comprar</button>
                                        <button class="btn btn-warning mb-15" @click="btnEnviarACarrito(item)">Carrito</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div v-else-if=" modoTienda == 'carrito' ">
                    <h1>Listado de productos</h1>
                    <br>  
                    <br>  
                    <br>  
                    <div class="shopping-cart dark">
                        <table id="cart" class="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style="width:50%">Producto</th>
							<th style="width:10%">Precio</th>
							<th style="width:8%">Cantidad</th>
							<th style="width:22%" class="text-center">Subtotal</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in this.listaCarrito"
                            :key="item.id">
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img v-bind:src=" getUrlImage(item.detalle.image) " alt="..." class="img-responsive"/></div>
									<div class="col-sm-10">
										<h4 class="nomargin" v-text="item.detalle.name"></h4>
									</div>
								</div>
							</td>
							<td data-th="Price" v-text=" 'S/ ' + item.detalle.price"></td>
							<td data-th="Quantity">
								<input type="number" class="form-control text-center"  
                                    @keyup=" calcularCantidad(item, index) " 
                                    @change=" calcularCantidad(item, index) "
                                    :value="item.cantidad"
                                    v-on:input="inputCantidad[index] = $event.target.value">
                                    <!--readonly="readonly"-->
							</td>
							<td data-th="Subtotal" class="text-center" v-text=" 'S/ ' + (item.detalle.price * item.cantidad).toFixed(2)"></td>
							<td class="actions" data-th="">
								<button class="btn btn-danger btn-sm" @click="eliminarProducto(item, index)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>								
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr class="visible-xs">
							
						</tr>
						<tr>
							<td></td>
							<td colspan="2" class="hidden-xs"></td>
							<td class="hidden-xs text-center">Total <h4><strong v-text=" sumarTotalPrecio() "></strong></h4></td>
							<td><a href="javascript:void(0)" class="btn btn-success btn-block" @click="btnComprarProductos()"><span class="glyphicon glyphicon-ok" aria-hidden="true" ></span> Comprar</a></td>
						</tr>
					</tfoot>
				</table>
                    </div>
                </div>
                <div v-else>
                    <h1>Comprar producto, llegue los campos requeridos</h1>
                    <br>  
                    <br>  
                    <br>  
                    <div class="col-md-7"><!-- col-md-offset-2 -->
                    <form action="">

                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Nombres" v-model="cliente.nombres">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Apellidos" v-model="cliente.apellidos">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="DNI" v-model="cliente.dni" onKeyPress="if(this.value.length==8) return false;">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Correo" v-model="cliente.correo">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Celular" v-model="cliente.celular" onKeyPress="if(this.value.length==9) return false;">
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Direccion" v-model="cliente.direccion">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Numero de tarjeta" v-model="cliente.numTarjeta">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <select class="form-control" v-model="cliente.genero">
                                    <option value="">Seleccione genero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="form-group">
                                <select class="form-control" v-model="cliente.departamento">
                                    <option value="">Seleccione un departamento</option>
                                    <option 
                                        v-for="(item2, index2) in soloDepartamentos()"
                                        :key="index2"
                                        v-bind:value="item2.id">{{ item2.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <select class="form-control" v-model="cliente.provincia" v-bind:disabled="this.cliente.departamento == ''">
                                    <option value="">Seleccione un provincia</option>
                                    <option 
                                        v-for="(item2, index2) in soloProvincia()"
                                        :key="index2"
                                        v-bind:value="item2.id">{{ item2.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <select class="form-control" v-model="cliente.distrito" v-bind:disabled="this.cliente.provincia == ''">
                                    <option value="">Seleccione un distrito</option>
                                    <option 
                                        v-for="(item2, index2) in soloDistrito()"
                                        :key="index2"
                                        v-bind:value="item2.id">{{ item2.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary" v-on:click="guardarCLiente()">Guardar</button>
                        </div>
                    </form>
                    </div>
                    <div class="col-md-5">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th style="width:50%">Producto</th>
                                        <th style="width:22%" class="text-center">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in this.listaCarrito"
                                        :key="item.id">
                                        <td data-th="Product">
                                            <div class="row">
                                                <div class="col-sm-4 hidden-xs"><img v-bind:src=" getUrlImage(item.detalle.image) " alt="..." class="img-responsive"/></div>
                                                <div class="col-sm-8">
                                                    <h4 class="nomargin" v-text="item.detalle.name"></h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-th="Subtotal" class="text-center" v-text=" 'S/ ' + (item.detalle.price * item.cantidad).toFixed(2)"></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td ></td>
                                        <td class="hidden-xs text-center">Total <h4><strong v-text=" sumarTotalPrecio() "></strong></h4></td>
                                    </tr>
                                </tfoot>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "app",
    data(){
        return {
            baseUrl: "http://localhost:8082/",
            api: "http://localhost:8085/",
            modoTienda: "productos",
            category: [],
            gender: [],
            price: 4,
            listProduct: [],
            mostrarCantidadDeCarrito: "(0)",
            listaCarrito: [],
            inputCantidad: [],


            listaEstados: [
                { id: 1, name: 'Casado'},
                { id: 2, name: 'Divocrciado'},
                { id: 3, name: 'Soltero'},
                { id: 4, name: 'Viudo'}
            ],
            obigeo: [],
            listaCliente: [],
            msj: "",
            cliente:{
                nombres: "",
                apellidos: "",
                dni: "",
                correo: "",
                celular: "",
                direccion: "",
                numTarjeta: "",
                genero: "",
                departamento: "",
                provincia: "",
                distrito: ""
            }
        }
    },
    mounted(){
        this.showProduct();
        //this.listaCarrito = (localStorage.getItem("carrito") != null) ? JSON.parse(localStorage.getItem("carrito")) : [];
        this.obtenerListadoCarrito();
        this.cantidadCarrito();
        //this.modoTienda = "comprar";
    },
    methods: {
        obtenerListadoCarrito(){
            this.listaCarrito = (localStorage.getItem("carrito") != null) ? JSON.parse(localStorage.getItem("carrito")) : [];
        },
        getUrlImage(src){
            return this.baseUrl + 'productos/' + src;
        },
        filter() {
            const data = { category: this.category, gender: this.gender, price: this.price };
            axios
                .post(this.api + "product/filter", data)
                .then( response => {
                    this.listProduct = response.data.data;
                });
        },
        showProduct() {
            axios
                .get(this.api + "product")
                .then( response => {
                    this.listProduct = response.data.data;
                });
        },
        mostrarCarrito() {
            if(this.listaCarrito.length > 0) this.modoTienda = "carrito";
            else alert("Agregue un producto al carrito.");
        },
        
        mostrarProductos(){
            this.modoTienda = "productos";
        },
        btnComprarProductos(){
            if(this.listaCarrito.length > 0) {
                this.modoTienda = "comprar";
                axios.get(this.api + "ubigeo")
                    .then(response => {
                        this.obigeo = response.data.data;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            }
            else alert("Agregue un producto al carrito.");
        },
        btnComprar(producto){
            this.btnEnviarACarrito(producto);
            this.mostrarCarrito();
        },
        btnEnviarACarrito(producto){

            var coincidencias = 0;
            if(this.listaCarrito.length > 0) {
                this.listaCarrito.forEach(
                    (element, index) => {
                        if(element.id == producto._id) { this.agregarCarrito(element, index, "coincidencia"); coincidencias++; }
                    }
                );
            }
            if(coincidencias <= 0) this.agregarCarrito(producto, 0, null);
        },
        agregarCarrito(element, index, tipo = null){
            if(tipo != null) this.listaCarrito[index] = {
                id: this.listaCarrito[index].id,
                cantidad: this.listaCarrito[index].cantidad + 1,
                detalle: this.listaCarrito[index].detalle
            };
            else{
                const datalle = {
                    id: element._id,
                    cantidad: 1,
                    detalle: element
                }
                this.listaCarrito.push(datalle);
            }

            this.agregarLocalStorage();
            this.cantidadCarrito();
        },
        eliminarProducto(element, index){
            this.listaCarrito.splice(index, 1);
            this.agregarLocalStorage();
            this.cantidadCarrito();
        },
        cantidadCarrito() {
            this.mostrarCantidadDeCarrito = "(" + this.listaCarrito.length + ")";
        },
        sumarTotalPrecio() {
            var sum = 0;
            this.listaCarrito.forEach( (element, index) => sum += (element.cantidad * element.detalle.price) );

            return "S/ " + sum.toFixed(2);

        },
        calcularCantidad(item, index) {
            
            //console.log("id => " , id, index, this.inputCantidad[index]);

            console.log("item", item);
            console.log("index", index);
            this.listaCarrito[index] = {
                id: this.listaCarrito[index].id,
                cantidad: (this.inputCantidad[index] <= 0) ? 1 : this.inputCantidad[index],
                detalle: this.listaCarrito[index].detalle
            };

            this.agregarLocalStorage();
            this.obtenerListadoCarrito();

            /*this.listaCarrito.forEach(
                (element, index) => {
                    if(element.id == item.id) { 
                        this.agregarCarrito(element, index, "coincidencia"); coincidencias++; 
                    }
                }
            );*/

        },
        agregarLocalStorage(){
            localStorage.setItem( "carrito", JSON.stringify(this.listaCarrito) );
        },


        guardarCLiente(){
            if(this.validate() == 0){

                const profile = {
                    nombres: this.cliente.nombres,
                    apellidos: this.cliente.apellidos,
                    dni: this.cliente.dni,
                    correo: this.cliente.correo,

                    celular: this.cliente.celular,
                    direccion: this.cliente.direccion,
                    numTarjeta: this.cliente.numTarjeta,
                    genero: this.cliente.genero,

                    departamento: this.cliente.departamento,
                    provincia: this.cliente.provincia,
                    distrito: this.cliente.distrito,
                    productos: this.listaCarrito
                };

                axios
                .post(this.api + "registro", profile)
                .then( response => {
                    console.log("response.data", response.data);
                    if(response.data.status == "OK"){
                        this.clear();
                        localStorage.clear();
                        this.obtenerListadoCarrito();
                        this.cantidadCarrito();
                        alert("Se realizo la compra correctamente y este es el numeo de orden - " + response.data.ordenCompra);
                        this.modoTienda = "productos";
                    }
                    else alert(response.data.msj);
                });
            }
            else alert(this.msj);
        },
        validate () {
            var error = 0;

            switch (true) {
                case this.cliente.nombres.trim() == "": this.msj = "Ingrese nombre"; error++; break;
                case this.cliente.apellidos.trim() == "": this.msj = "Ingrese Apellido"; error++; break;
                case this.cliente.dni.trim() == "": this.msj = "Ingrese dni"; error++; break;
                case this.cliente.dni.length > 8: this.msj = "Ingrese un dni"; error++; break;

                case this.cliente.correo.trim() == "": this.msj = "Ingrese Correo"; error++; break;
                case !this.validateEmail(this.cliente.correo.trim()): this.msj = "Ingrese un correo valido"; error++; break;
                case this.cliente.celular.trim() == "": this.msj = "Ingrese Celular"; error++; break;
                case this.cliente.celular.length > 9: this.msj = "Ingrese un celular valido"; error++; break;

                case this.cliente.direccion.trim() == "": this.msj = "Ingrese una Direccion"; error++; break;
                case this.cliente.numTarjeta.trim() == "": this.msj = "Ingrese un numero de Tarjeta de credito"; error++; break;
                case this.cliente.genero == "": this.msj = "Seleccine genero"; error++; break;
                case this.cliente.departamento == "": this.msj = "Seleccione departamento"; error++; break;

                case this.cliente.provincia == "": this.msj = "Seleccione provincia"; error++; break;
                case this.cliente.distrito == "": this.msj = "Seleccione distrito"; error++; break;
                default: this.msj =""; error = 0; break;
            }
            return error;
        
        },
        soloDepartamentos(){
            return this.obigeo.filter((ele, id) => {
                return ele.parent == 0;
            });
        },
        soloProvincia(){ 
            return this.obigeo.filter((ele, id) => {
                return ele.parent == this.cliente.departamento;
            });
        },
        soloDistrito(){
            return this.obigeo.filter((ele, id) => {
                return ele.parent == this.cliente.provincia;
            });
        },
        borrarCliente(index){
            this.listaCliente.splice(index, 1);
        },
        clear(){
            this.cliente = {
                nombres: "",
                apellidos: "",
                dni: "",
                correo: "",
                celular: "",
                direccion: "",
                numTarjeta: "",
                genero: "",
                departamento: "",
                provincia: "",
                distrito: ""
            }
        },
        validateEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
    }
    .w-110{
        width: 110px;
    }
    .card{
        border: 1px solid #0000000f;
        border-radius: 3px;
    }
    .card img{
        width: 100%;
    }
    .m0{
        margin: 0 !important;
    }
    .mt-0{
        margin-top: 0px !important;
    }
    .mt-15{
        margin-top: 15px !important;
    }
    .mb-15{
        margin-bottom: 15px !important;
    }
    .mr-15{
        margin-right: 15px;
    }
    header{
        margin-top: 15px;
        margin-bottom: 45px;
    }
    .shopping-cart.dark{
        background-color: transparent;
    }
</style>