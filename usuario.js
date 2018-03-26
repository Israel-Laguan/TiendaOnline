/* global UsuarioDWR */

jQuery(document).ready(function () {

//jQuery("#mu").click(function(){
//usuarioJs.validarUpload(); 
//});
    jQuery("#dialogoConfirmar").hide();
    usuarioJs.getList();
//<editor-fold defaultstate="collapse" desc="Botones">
    jQuery("#Boton-salir-rg").click(function () {
        jQuery(".login-modal").show();
        setTimeout(function () {
            window.location.href = "/Portalito/Portalito/login.action";
        }, 3000);
    });
    jQuery("#enviar").click(function () {
        var validation = validanguage.validateForm('usuarioform');
        if (validation.result) {
            usuarioJs.validarDuplicados();

        }
    });
    jQuery("#limpiar").click(function () {
        utilForm.reset('#usuarioform');
        usuarioJs.clean();
    });
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="Grid">
    jQuery("#usuarioGrid").jqGrid({
        url: '',
        datatype: '',
        caption: "Tabla de Usuarios",
        colNames: [
            "Usuario id",
            "Usuario",
            "Nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "correo",
            "contrasena",
            "confirmar Contrasena",
            "fechaCreacion",
            "fechaModifico",
            "fotoUsuario",
            "", ""
        ],
        colModel: [
            {
                name: 'usuario id',
                index: 'usuario id',
                width: 30,
                hidden: true
            },
            {
                name: 'usuario',
                index: 'usuario',
                align: 'center'
            },
            {
                name: 'nombre',
                index: 'nombre',
                align: 'center'
            },
            {
                name: 'apellidoPaterno',
                align: 'center',
                index: 'apellidoPaterno'

            },
            {
                name: 'apellidoMaterno',
                align: 'center',
                index: 'apellidoMaterno'
            },
            {
                name: 'correo',
                align: 'center',
                index: 'correo'
            },
            {
                name: 'contrasena',
                align: 'center',
                index: 'contrasena',
                hidden: true
            },
            {
                name: 'confirmarContrasena',
                align: 'center',
                index: 'confirmarContrasena',
                hidden: true
            },
            {
                name: 'fechaCreacion',
                align: 'center',
                index: 'fechaCreacion',
                hidden: false
            },
            {
                name: 'fechaModifico',
                align: 'center',
                index: 'fechaModifico',
                hidden: false
            },
            {
                name: 'fotoUsuario',
                align: 'center',
                index: 'fotoUsuario',
                hidden: false
            },
            {
                name: 'editar',
                align: 'center',
                index: 'editar',
                width: 30,
                hidden: false
            },
            {
                name: 'borrar',
                align: 'center',
                index: 'borrar',
                width: 30,
                hidden: false
            }
        ],

//autowidth:true,
        width: 1030,
        height: 200,
        hidegrid: true,
        multiselect: false,
        viewrecords: false
    });
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="Menu function">
    var contador = 1;
    jQuery('.menu_bar').click(function () {
        if (contador === 1) {
            jQuery('nav').animate({
                left: '0'
            });
            contador = 0;
        } else {
            contador = 1;
            jQuery('nav').animate({
                left: '-100%'
            });
        }
    });
//</editor-fold>
    modsJS.ini();
});
var modsJS = {
    ini: function () {
        var actionName = utilMisc.getAction();
        if (actionName === "registroRapido.action") {
            modsJS.setViewRegistroRapido();
        }
        if (actionName === "usuario.action") {
            modsJS.setViewUsuario();
        }
    },
    setViewRegistroRapido: function () {
        jQuery("#pantallaRR").show();
        jQuery("#pantallaRC").hide();
        jQuery("#cont-am").hide();
        jQuery("#cont-ap").hide();
        jQuery("#cont-nombre").hide();
        jQuery("#cont-grid").hide();
        jQuery("#cont-upload").hide();
        jQuery("#cont-menu").hide();
    },
    setViewUsuario: function(){
        jQuery("#pantallaRR").hide();
        jQuery("#pantallaRC").show();
    }
};
var usuarioJs = {
    //funcion que ejecuta el servlet del upload.
    mandarArchivo: function (elemento) {
        var file = elemento.files[0];
        var objhidden = document.formulario.nombre;
        objhidden.value = file.name;
        document.formulario.target = "null";
        document.formulario.action = "/Portalito/Upload.action";
        document.formulario.submit();
    },
//<editor-fold defaultstate="collapse" desc="Clean">
    clean: function () {
        jQuery("#usuarioform_usuarioId").val("");
        jQuery("#usuarioform_Usuario").val("");
        jQuery("#usuarioform_Nombre").val("");
        jQuery("#usuarioform_ApellidoM").val("");
        jQuery("#usuarioform_ApellidoP").val("");
        jQuery("#usuarioform_Correo").val("");
        jQuery("#usuarioform_usuarioContrasena").val("");
        jQuery("#usuarioform_usuarioConfirmarContrasena").val("");
        jQuery("#usuarioform_fechaCreacion").val("");
        jQuery("#usuarioform_fechaModifico").val("");
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="Construir Objeto">
    construyeObjeto: function () {
        var d = new Date().toISOString().slice(0, 10);
        var usuarioId = jQuery("#usuarioform_usuarioId").val();
        var usuario = jQuery("#usuarioform_Usuario").val();
        var nombre = jQuery("#usuarioform_Nombre").val();
        var am = jQuery("#usuarioform_ApellidoM").val();
        var ap = jQuery("#usuarioform_ApellidoP").val();
        var correo = jQuery("#usuarioform_Correo").val();
        var contrasena = jQuery("#usuarioform_usuarioContrasena").val();
        var confirmarContrasena = jQuery("#usuarioform_usuarioConfirmarContrasena").val();
        var fechaCreacion = d;
        var fechaModifico = jQuery("#usuarioform_fechaModifico").val();
        var usuarioDTO = new UsuarioDTO();
        usuarioDTO.usuarioId = usuarioId;
        usuarioDTO.usuario = usuario;
        usuarioDTO.nombre = nombre;
        usuarioDTO.apellidoPaterno = am;
        usuarioDTO.apellidoMaterno = ap;
        usuarioDTO.correo = correo;
        usuarioDTO.contrasena = contrasena;
        usuarioDTO.confirmarContrasena = confirmarContrasena;
        usuarioDTO.fechaCreacion = fechaCreacion;
        usuarioDTO.fechaModifico = fechaModifico;
        return usuarioDTO;
    },
    construyeObjetoActualiza: function () {
        var d = new Date().toISOString().slice(0, 10);
        var usuarioId = jQuery("#usuarioform_usuarioId").val();
        var usuario = jQuery("#usuarioform_Usuario").val();
        var nombre = jQuery("#usuarioform_Nombre").val();
        var am = jQuery("#usuarioform_ApellidoM").val();
        var ap = jQuery("#usuarioform_ApellidoP").val();
        var correo = jQuery("#usuarioform_Correo").val();
        var contrasena = jQuery("#usuarioform_usuarioContrasena").val();
        var confirmarContrasena = jQuery("#usuarioform_usuarioConfirmarContrasena").val();
        var fechaCreacion = jQuery("#usuarioform_fechaCreacion").val();
        var fechaModifico = d;
        var usuarioDTO = new UsuarioDTO();
        usuarioDTO.usuarioId = usuarioId;
        usuarioDTO.usuario = usuario;
        usuarioDTO.nombre = nombre;
        usuarioDTO.apellidoPaterno = ap;
        usuarioDTO.apellidoMaterno = am;
        usuarioDTO.correo = correo;
        usuarioDTO.contrasena = contrasena;
        usuarioDTO.confirmarContrasena = confirmarContrasena;
        usuarioDTO.fechaCreacion = fechaCreacion;
        usuarioDTO.fechaModifico = fechaModifico;
        return usuarioDTO;
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="get list">
    getList: function () {
        UsuarioDWR.getListUsuario(usuarioJs.getListUsuarioCallback);
    },
    getListUsuarioCallback: function (list) {
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<th>Usuario ID</th>";
        html += "<th>NOMBRE</th>";
        html += "<th>APELLIDO P</th>";
        html += "<th>APELLIDO M</th>";
        html += "<th>CORREO</th>";
        html += "<th>CONTRASEÑA</th>";
        html += "<th>CONF. CONTRASEÑA</th>";
        html += "<th>FECHA CREACION</th>";
        html += "<th>FECHA MODIFICO</th>";
        html += "<th>FOTO</th>";
        html += "</tr>";
        for (var x = 0; x < list.length; x++) {
            html += "<tr>";
            html += "<td>" + list[x].usuarioId + "</td>";
            html += "<td>" + list[x].nombre + "</td>";
            html += "<td>" + list[x].apellidoPaterno + "</td>";
            html += "<td>" + list[x].apellidoMaterno + "</td>";
            html += "<td>" + list[x].correo + "</td>";
            html += "<td>" + list[x].contrasena + "</td>";
            html += "<td>" + list[x].confirmarContrasena + "</td>";
            html += "<td>" + list[x].fechaCreacion + "</td>";
            html += "<td>" + list[x].fechaModifico + "</td>";
            html += "<td>" + list[x].fotoUsuario + "</td>";
            html += "</tr>";
        }
        html += "</table>";
        jQuery("#tdu").html(html);
//llenar el grid
        jQuery("#usuarioGrid").clearGridData();
        for (var x = 0; x < list.length; x++) {
            var objetos = list[x];
            objetos.borrar = "<div style=' cursor:pointer;' onclick='usuarioJs.eliminar(" + objetos.usuarioId + "); '><img style='width:20px; height:20px;' src='../imagenes/basura.png'></div>";
            jQuery("#usuarioGrid").addRowData(x + 1, objetos);
        }
        jQuery("#usuarioGrid").clearGridData();
        for (var x = 0; x < list.length; x++) {
            var buscar = list[x];
            buscar.editar = "<div style=' cursor:pointer;' onclick='usuarioJs.findById(" + buscar.usuarioId + "); '><img style='width:20px; height:20px;' src='../imagenes/editar.png'></div>";
            jQuery("#usuarioGrid").addRowData(x + 1, buscar);
        }
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="save">
    saves: function () {
        var saves = usuarioJs.construyeObjeto();
        saves.usuarioId = null;
        UsuarioDWR.saves(saves, usuarioJs.savesCallback);
    },
    savesCallback: function () {
        usuarioJs.clean();
        usuarioJs.getList();
        utilEffect.showToast("success", "Guardado con exito", );
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="FindBYId">
    findById: function (busca) {
        UsuarioDWR.findById(busca, usuarioJs.findByIdCallback);
    },
    findByIdCallback: function (usuario) {
        usuarioJs.clean();
        jQuery("#usuarioform_usuarioId").val(usuario.usuarioId);
        jQuery("#usuarioform_Usuario").val(usuario.usuario);
        jQuery("#usuarioform_Nombre").val(usuario.nombre);
        jQuery("#usuarioform_ApellidoM").val(usuario.apellidoMaterno);
        jQuery("#usuarioform_ApellidoP").val(usuario.apellidoPaterno);
        jQuery("#usuarioform_Correo").val(usuario.correo);
        jQuery("#usuarioform_usuarioContrasena").val(usuario.contrasena);
        jQuery("#usuarioConfirmarContrasena").val(usuario.confirmarContrasena);
        jQuery("#usuarioform_fechaCreacion").val(usuario.fechaCreacion);
        jQuery("#usuarioform_fechaModifico").val(usuario.fechaModifico);
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="Update">
    update: function () {
        utilEffect.showProgressBar();
        var up = usuarioJs.construyeObjetoActualiza();
        UsuarioDWR.update(up, usuarioJs.updateCallback);
    },
    updateCallback() {
        usuarioJs.clean();
        usuarioJs.getList();
        utilEffect.showToast("success", "Actualizado con exito", );
    },
//</editor-fold>
//<editor-fold defaultstate="collapse" desc="Eliminar">
    eliminar: function (eliminar) {
//    alert("esperando funcion");
        jQuery("#dialogoConfirmar").show();
        jQuery(function () {
            jQuery("#dialogoConfirmar").dialog({
                autoOpen: true,
                modal: true,
                buttons: {
                    "Eliminar Registro": function () {
                        UsuarioDWR.eliminar(eliminar, usuarioJs.eliminarCallback);
                        jQuery(this).dialog("close");
                    },
                    Cancel: function () {
                        jQuery(this).dialog("close");
                    }
                }
            });
        });
    },

    validarUpload: function () {
        var rutaCompleta = jQuery("#usuarioform_Upload").val();
        var nombreDelArchivo = "";
        if (rutaCompleta != "") {
            var startIndex = (rutaCompleta.indexOf('\\') >= 0 ? rutaCompleta.lastIndexOf('\\') : rutaCompleta.lastIndexOf('/'));
            nombreDelArchivo = rutaCompleta.substring(startIndex);
            if (nombreDelArchivo.indexOf('\\') === 0 || nombreDelArchivo.indexOf('/') === 0) {
                nombreDelArchivo = nombreDelArchivo.substring(1);
            }
        }
        jQuery("#usuarioform_UploadFoto").val(nombreDelArchivo);
//        alert(nombreDelArchivo);
    },

    eliminarCallback() {
        usuarioJs.clean();
        usuarioJs.getList();
        jQuery(".save-modal").hide();
    },
//</editor-fold>
    validarDuplicados: function () {
        var usuario = jQuery("#usuarioform_Usuario").val();
        UsuarioDWR.validarDuplicados(usuario, usuarioJs.validarDuplicadosCallback);
    },
    validarDuplicadosCallback: function (isValido) {
        if (isValido == false && jQuery('#usuarioform_usuarioId').val() != 0) {
            usuarioJs.saveAndUpdate();
            return;
        }
// Nuevo registro, en este caso se permite el saveAndUpdate
        if (isValido == true && jQuery('#usuarioform_usuarioId').val() == 0) {
            usuarioJs.saveAndUpdate();
            return;
        }
// Registro existente, se le cambio el usuario, en este caso se permite el saveAndUpdate
        if (isValido == true && jQuery('#usuarioform_usuarioId').val() != 0) {
            usuarioJs.saveAndUpdate();
            return;
        }
        utilEffect.showToast("error", "El USUARIO ya existe en la base de datos");
    },
    saveAndUpdate: function () {
        if (jQuery("#usuarioform_usuarioId").val() == 0) {
            usuarioJs.saves();
        } else {
            usuarioJs.update();
        }
    }
};


//<editor-fold defaultstate="collapse" desc="Validaciones">
validanguage.el.usuarioform_Usuario = {
    characters: {
        mode: 'allow', expression: 'alpha ', suppress: false},
    validations: [
        ProfileStripWhitespace, ProfileRequiredField, ProfileCheckForInvalidCharacter, {ProfileMinLength5}]};
validanguage.el.usuarioform_Nombre = {
    characters: {
        mode: 'allow', expression: 'alpha ', suppress: false},
    validations: [
        ProfileStripWhitespace, ProfileCheckForInvalidCharacter, {ProfileMinLength5}]};
validanguage.el.usuarioform_Correo = {
    characters: {
        mode: 'allow', expression: 'alphanumericspecial ', suppress: false},
    validations: [
        ProfileStripWhitespace, ProfileCheckForInvalidCharacter, ProfileMail]};

   validanguage.el.usuarioform_usuarioContrasena = {
        characters: {
            mode: 'allow', expression: 'alphanumericspecial', suppress: false},
        validations: [
            ProfileStripWhitespace, ProfileRequiredField, ProfileCheckForInvalidCharacter]};
    validanguage.el.usuarioform_usuarioConfirmarContrasena = {
        characters: {
            mode: 'allow', expression: 'alphanumericspecial', suppress: false},
        validations: [
            ProfileStripWhitespace, ProfileRequiredField, ProfileCheckForInvalidCharacter, {name: function () {
                    return !!(this.value == jQuery('#usuarioform_usuarioContrasena').val());
                }, errorMsg: 'La contraseña es diferente', onerror: utilEffect.showValidationTooltip, onsuccess: utilEffect.hideValidationTooltip}]};
//</editor-fold>