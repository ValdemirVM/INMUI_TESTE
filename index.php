<!DOCTYPE html> 
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Inmui</title>
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
<link rel="stylesheet" href="jquery-mobile/inmui.min.css" />
<link rel="stylesheet" href="jquery-mobile/jquery.mobile.icons-1.4.5.min.css" />
<link rel="stylesheet" href="jquery-mobile/jquery.mobile.structure-1.4.5.min.css" /><script src="jquery-mobile/jquery-1.11.0.min.js"></script> 
<script src="jquery-mobile/jquery.mobile-1.4.5.min.js"></script> 


<style type="text/css">

</style>
<script type="text/javascript">
//var tooltip_VGMJ = (function(id) {   });

 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        checkConnection();
    }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
        }
</script>
</head> 
<body> 
<div data-role="page" id="page" data-title="Minha Página" data-theme="a">
	<div data-role="header">
    <a href="#" data-role="button" data-icon="home" data-iconpos="notext"></a>
		<h1>Página um</h1>
    <a href="#" data-role="button" data-icon="grid" data-iconpos="notext" class="ui-btn-right"></a>
	</div>
	<div data-role="content">
    
		<ul data-role="listview" data-filter="true" data-filter-placeholder="Buscar" data-inset="true">
			<li><a href="#panel">Painel Lateral</a></li>
            <li data-role="list-divider"><a href="#popup" data-rel="popup" data-transition="pop" >Popup</a></li>
			<li><a href="#dialog1" data-rel="dialog" data-transition="slide">Dialog</a></li>
            <li><a href="#page2">page2</a></li>
		</ul>		
	</div>
	<div data-role="footer" data-position="fixed">
		<div data-role="navbar">
            <ul>
               <li><a href="#page2" data-icon="star" data-transition="pop">jQuery</a></li>
               <li><a href="#page3" data-icon="plus" data-transition="slideup"> jQuery UI </a></li>
               <li><a href="#page4" data-icon="grid" data-theme="e" data-transition="flip"> jQuery Mobile </a></li>
            </ul>
         </div><!-- /navbar -->
	</div>
   
  
  <div data-role="panel" id="panel">
	  <div data-role="content">Painel</div>
  </div>
  
  <div data-role="popup" id="popup">
	  <div data-role="content">Painel</div>
  </div>
    
</div>

<div data-role="page" id="dialog1">
	<div data-role="header" ><h1>dialogo de exemplo</h1></div>
	<div data-role="content">
		Este e um quadro de dialogo simples que esta dentro do mesmo HTML do link
		<a href="#" data-role="button" data-rel="back">Aceitar</a>
   </div>
</div>

<div data-role="page" id="page2" data-theme="e">
	<div data-role="header">
    <a href="#page" data-role="button" data-icon="home" data-iconpos="notext"></a>
		<h1>Página dois</h1>
	</div>
	<div data-role="content">	
	<form action="#" method="post" data-inset="true">
		<label for="nome">Nome:</label>
		<input type="text" id="nome" name="nome" required>
        
        <label for="telefone">Telefone:</label>
		<input type="tel" id="telefone" name="telefone" required>
        
        <label for="data">Data:</label>
		<input type="date" id="data" name="data" required>
        
        <label for="flip1">Selecionar uma de duas opcoes</label>
        <select name="slider" id="flip1" data-role="slider">
            <option value="off">Off</option>
            <option value="On">On</option>
        </select> 
        
        <input type="submit" value="Emviar" >       
        
    </form><br><br>

	<video src="O_Patinho_Feio_medium.mp4" controls></video>

        
        		
	</div>
	<div data-role="footer">
		<h4>Página de rodapé</h4>
	</div>
</div>

<div data-role="page" id="page3">
	<div data-role="header">
     <a href="#page" data-role="button" data-icon="home" data-iconpos="notext"></a>
		<h1>Página três</h1>
	</div>
	<div data-role="content">	
		
	<div class="ui-grid-a">
    
	<div class="ui-block-a" >
	<div class="ui-bar ui-bar-e">
		<strong>Esta é a coluna numero 1</strong>Com cor amarela    
    </div>
    </div>
    
    <div class="ui-block-b">
    <div class="ui-bar ui-bar-b">
    <strong>Esta é a coluna numero 2</strong> Com cor azul    
    </div>
    </div>
    
    <div class="ui-block-b">
    <div class="ui-bar ui-bar-b">
    <strong>Esta é a coluna numero 2</strong> Com cor azul    
    </div>
    </div>
    
    </div><!-- /grid-a -->
        		
	</div>
	<div data-role="footer">
		<h4>Página de rodapé</h4>
	</div>
</div>

<div data-role="page" id="page4">
	<div data-role="header">
     <a href="#page" data-role="button" data-icon="home" data-iconpos="notext"></a>
		<h1>Página quatro</h1>
	</div>
  <div data-role="content">	

	<div data-role="collapsible" data-collapsed="false">
		<h3>Elemento Collapsible aberto</h3>
		<p>Este e o conteudo do collapsible que podemos ocultar</p>
    </div>
		
	<div data-role="collapsible" data-theme="a" data-content-theme="e">
		<h3>Encabecado com tema A</h3>
		<p>O conteudo tem o tema e</p>
            <div data-role="collapsible" data-content-theme="a">
                <h3>Collapsible dentro de outro</h3>
                <p>Neste caso vemos que este esta dentro de outro</p>
            </div>
	</div>
	
    		
	</div>
    
	<div data-role="footer">
		<h4>Página de rodapé</h4>
	</div>
</div>

</body>
</html>
