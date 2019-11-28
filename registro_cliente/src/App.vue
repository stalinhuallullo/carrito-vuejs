<template>
  <div id="app">

    <div class="container">
      <div class="row">

        <div class="col-md-6">
          <form action="">

            <div class="form-group">
              <input type="text" class="form-control" placeholder="Nombres" v-model="cliente.nombres">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Apellidos" v-model="cliente.apellidos">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Correo" v-model="cliente.correo">
            </div>

            <div class="form-group">
              <input type="number" class="form-control" placeholder="Celular" v-model="cliente.celular" onKeyPress="if(this.value.length==9) return false;">
            </div>
            <div class="form-group">
              <input type="date" class="form-control" placeholder="Fecha de nacimiento" v-model="cliente.fechaNac">
            </div>
            <div class="form-group">
              <select class="form-control" v-model="cliente.genero">
                <option value="">Seleccione genero</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div class="form-group">
              <input type="number" class="form-control" placeholder="DNI" v-model="cliente.dni" onKeyPress="if(this.value.length==8) return false;">
            </div>

            <div class="form-group">
              <select class="form-control" v-model="cliente.departamento">
                <option value="">Seleccione un departamento</option>
                <option 
                    v-for="(item2, index2) in soloDepartamentos()"
                    :key="index2"
                    v-bind:value="item2.id">{{ item2.name }}</option>
              </select>
            </div>

            <div class="form-group">
              <select class="form-control" v-model="cliente.provincia" v-bind:disabled="this.cliente.departamento == ''">
                <option value="">Seleccione un provincia</option>
                <option 
                    v-for="(item2, index2) in soloProvincia()"
                    :key="index2"
                    v-bind:value="item2.id">{{ item2.name }}</option>
              </select>
            </div>

            <div class="form-group">
              <select class="form-control" v-model="cliente.distrito" v-bind:disabled="this.cliente.provincia == ''">
                <option value="">Seleccione un distrito</option>
                <option 
                    v-for="(item2, index2) in soloDistrito()"
                    :key="index2"
                    v-bind:value="item2.id">{{ item2.name }}</option>
              </select>
            </div>

            <div class="form-group">
              <select class="form-control" v-model="cliente.estado">
                <option value="">Seleccione un estado</option>
                <option 
                    v-for="(item, index) in listaEstados"
                    :key="index"
                    v-bind:value="item.name">{{ item.name }}</option>
              </select>
            </div>

            <button type="button" class="btn btn-primary" v-on:click="guardarCLiente()">Guardar</button>

          </form>
        </div>

        <div class="col-md-8" style="display: none;">
          
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Correo</th>
                <th scope="col">Celular</th>
                <th scope="col">Cumple</th>
                <th scope="col">Genero</th>
                <th scope="col">DNI</th>
                <th scope="col">Departamento</th>
                <th scope="col">Provincia</th>
                <th scope="col">Distrito</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listaCliente"
                :key="index">
                <th scope="row">{{ item.nombres }}</th>
                <td>{{ item.apellidos }}</td>
                <td>{{ item.correo }}</td>
                <td>{{ item.celular }}</td>
                <td>{{ item.fechaNac }}</td>
                <td>{{ item.genero }}</td>
                <td>{{ item.dni }}</td>
                <td>{{ item.estado }}</td>
                <td><button type="button" class="btn btn-primary" v-on:click="borrarCliente(index)">Borrar</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "app",
  methods:{
    guardarCLiente(){
      if(this.validate() == 0){

        const profile = {
          nombres: this.cliente.nombres,
          apellidos: this.cliente.apellidos,
          correo: this.cliente.correo,
          celular: this.cliente.celular,
          fechaNac: this.cliente.fechaNac,
          genero: this.cliente.genero,
          dni: this.cliente.dni,
          departamento: this.cliente.departamento,
          provincia: this.cliente.provincia,
          distrito: this.cliente.distrito,
          estado: this.cliente.estado
        };

        axios
          .post("http://localhost:8081/registro", profile)
          .then( response => {
            if(response.data.status == "OK"){
              this.cliente = {
                nombres: response.data.nombres.trim(),
                apellidos: response.data.apellidos,
                correo: response.data.correo,
                celular: response.data.celular,
                fechaNac: response.data.fechaNac,
                genero: response.data.genero,
                dni: response.data.dni,
                departamento: response.data.departamento,
                provincia: response.data.provincia,
                distrito: response.data.distrito,
                estado: response.data.estado
              }

              this.listaCliente.push(this.cliente);
              this.clear();
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
        case this.cliente.correo.trim() == "": this.msj = "Ingrese Correo"; error++; break;
        case !this.validateEmail(this.cliente.correo.trim()): this.msj = "Ingrese un correo valido"; error++; break;
        case this.cliente.celular.trim() == "": this.msj = "Ingrese Celular"; error++; break;
        case this.cliente.celular.length > 9: this.msj = "Ingrese un celular valido"; error++; break;
        case this.cliente.fechaNac.trim() == "": this.msj = "Ingrese Fecha de nacimiento"; error++; break;
        case this.cliente.genero.trim() == "": this.msj = "Seleccine genero"; error++; break;
        case this.cliente.dni.trim() == "": this.msj = "Ingrese dni"; error++; break;
        case this.cliente.dni.length > 8: this.msj = "Ingrese un dni"; error++; break;
        case this.cliente.departamento == "": this.msj = "Seleccione departamento"; error++; break;
        case this.cliente.provincia == "": this.msj = "Seleccione provincia"; error++; break;
        case this.cliente.distrito == "": this.msj = "Seleccione distrito"; error++; break;
        case this.cliente.estado == "": this.msj = "Seleccione estado"; error++; break;
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
        correo: "",
        celular: "",
        fechaNac: "",
        genero: "",
        dni: "",
        departamento: "",
        provincia: "",
        distrito: "",
        estado: ""
      }
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
  },
  mounted(){
    
    axios.get("http://localhost:8081/ubigeo")
      .then(response => {
        this.obigeo = response.data.data;
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  data(){
    return{
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
        correo: "",
        celular: "",
        fechaNac: "",
        genero: "",
        dni: "",
        departamento: "",
        provincia: "",
        distrito: "",
        estado: ""
      }
    }
  }
  
};
</script>

<style lang="scss">
  @import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css);

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
