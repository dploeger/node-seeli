var cli = require("../")
var Test = new cli.Command({
	description:"diaplays a simple hello world command"
	,usage:[
		cli.bold("Usage:") + " cli hello --interactive",
		cli.bold("Usage:") + " cli hello --name=john",
		cli.bold("Usage:") + " cli hello --name=john --name=marry --name=paul -v screaming"
	]
	,flags:{
		name:{
			type:[ String, Array ]
			,shorthand:'n'
			,description:"The name of the person to say hello to"
			,required:true
		}
		,excited: {
			type:Boolean
			,shorthand: 'e'
			,description:"Say hello in a very excited manner"
			,default:false
		}
		,volume:{
			type:String
			,choices:['normal', 'screaming']
			,description:"Will yell at each person"
			,default:'normal'
			,shorthand:'v'
		}
	}
	,run: function( cmd, data, cb ){
		var out = [];

		var names = Array.isArray( data.name ) ? data.name : [ data.name ]
		for( var x =0; x< names.length; x++ ){
			var value = "Hello, " + names[x]
			if( data.excited ){
				value += '!'
			}

			out.push( value );

		}
		out = out.join('\n');

		out = data.volume == 'screaming' ? out.toUpperCase() : out;
		cb( null, out );
	}
});
cli.use('world', Test)
cli.set('color','yellow');
cli.run();
