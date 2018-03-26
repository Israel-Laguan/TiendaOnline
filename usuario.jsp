<%@taglib uri="/struts-tags" prefix="s"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet"  type="text/css" href="../css/estilos.css">
<script src='<s:url value='../dwr/interface/UsuarioDWR.js'/>' type='text/javascript'></script>
<script src='<s:url value='../js/dwrErrorHandler.js'/>' type='text/javascript'></script>
<script src='<s:url value='../js/usuario.js'/>' type='text/javascript'></script>
<title>Registro Rapido</title>
</head>
<body>
    
<!--Cuerpo Principal-->
<div class="col-md-12 col-sm-12 col-xs-12" style=" background-image: url('../imagenes/fantasma.jpg')">
<!--Separador Derecha-->
<div class="col-md-1 col-sm-1 col-xs-0" ></div>
<!--Separador-->
<!--Cuerpo Principal-->
<div class="col-md-10 col-sm-10 col-xs-12 BodyPage cero">
<header>
<div class="menu_bar cero">
<a href="#" class="bt-menu"><span class="fa fa-lemon-o"></span>Menu</a>
</div>

<nav style='height: auto;' class="cero">
<ul id="cont-menu" >
<li><a href="/Portalito/Portalito/home.action"><span class="fa fa-home"></span>Inicio</a></li>
<li><a href="/Portalito/Portalito/usuario.action"><span class="fa fa-home"></span>Registro Completo</a></li>
<li><a href="#"><span class="fa fa-gamepad"></span>Roms</a></li>
<li><a href="#"><span class="fa fa-archive"></span>Emuladores</a></li>
<li><a href="#"><span class="fa fa-list"></span>Descripciones</a></li>
<li><a href="#"><span class="fa fa-deaf"></span>Contactos</a></li>
</ul>
</nav>
</header>
<h1 id="pantallaRR" class='centerObject'><img class='col-md-7 col-sm-7 col-xs-12 ' src="../imagenes/registrorapido.png"></h1>
<h1 id="pantallaRC" class='centerObject'><img class='col-md-7 col-sm-7 col-xs-12 ' src="../imagenes/rc.png"></h1>
<!--Botones-->
<div class="col-md-8 col-sm-12 col-xs-12"></div>
<div class="col-md-4 col-sm-12 col-xs-12 centerObject paddingButton">
<div>
<img id="enviar" style="width: 130px; cursor:pointer;"  class="col-md-6 col-sm-6 col-xs-4" src="../imagenes/enviar.png">
</div>
<div>
<img id="limpiar" style="width: 130px; cursor:pointer;"  class="col-md-6 col-sm-6 col-xs-4" src="../imagenes/limpiar.png">
</div>
</div>

<!--Formulario-->
<div class="col-md-12 col-sm-12 col-xs-12 ">
<s:form id='usuarioform' name='usuarioform'  cssClass='pair-wrap' >
<div class="hidden">
<p class="etiqueta-small">UsuarioId</p>
<s:textfield name='usuarioId' cssClass='input-style' />
</div>
<div id="cont-usuario" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Usuario</p>
<s:textfield name='Usuario' cssClass='input-style' />
</div>
<div id="cont-nombre" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Nombre</p>
<s:textfield name='Nombre' cssClass='input-style' />
</div>
<div id="cont-am" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Apellido Materno</p>
<s:textfield name='ApellidoM' cssClass='input-style' />
</div>
<div id="cont-ap" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Apellido Paterno</p>
<s:textfield name='ApellidoP' cssClass='input-style' />
</div>
<div id="cont-correo" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Correo</p>
<s:textfield name='Correo' cssClass='input-style'  />
</div>
<div id="cont-contrasena" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Contraseña</p>
<s:password name='usuarioContrasena' cssClass='input-style' />
</div>  
<div id="cont-confcontrasena" class="col-md-4 col-sm-4 col-xs-12 ">
<p class="etiqueta-small">Confirmar Contraseña</p>
<s:password name='usuarioConfirmarContrasena' cssClass='input-style' />
</div>  
<div id="cont-fc" class="col-md-4 col-sm-4 col-xs-12 hidden ">
<p class="etiqueta-small">Fecha Creacion</p>
<s:textfield name='fechaCreacion' cssClass='input-style' />
</div>  
<div id="cont-fm" class="col-md-4 col-sm-4 col-xs-12 hidden">
<p class="etiqueta-small ">Fecha Modifico</p>
<s:textfield name='fechaModifico' cssClass='input-style' />
</div>  

</s:form>
   
<div id="cont-grid" class="col-md-12 col-sm-12 col-xs-12" style="overflow-x: scroll; margin: 0; padding: 0;">
<table id='usuarioGrid'></table>
</div>
<div id="tdu" class="hidden"></div>
</div>
<div class="salto"></div>
<br>
</div>
<!--Separador Izquierda-->
<div class="col-md-1 col-sm-1 col-xs-0" ></div>
<!--Separador-->
</div>

<form id="cont-upload" name="formulario"  method="post" enctype="multipart/form-data">
    <table>
        <tr>
            <td>
                <input type="file" name="archivo" id="files" onchange="usuarioJs.mandarArchivo(this);"/>
                <input type="submit" name="ejecutar" value="SUBIR ARCHIVO"/>
            </td>
        </tr>
    </table>
    <input type="hidden" name="nombre" value="">
</form>

<iframe name="null" style="display:none;"></iframe>

<div class="login-modal " style=" display: none;">
<div  class="login-msj-espera "><img style="width: 40px;  " src="../imagenes/link.gif">
Regresando al Login espere...
</div>
</div>
<div class="save-modal " style=" display: none;">
<div  class="login-msj-espera "><img style="width: 40px;  " src="../imagenes/perro.gif">
Espere...
</div>
</div>
<div id="dialogoConfirmar" title="ALERTA�">
<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Esta a punto de borrar un registro, esta accion es irreversible�</p>
</div>
</body>
</html>
