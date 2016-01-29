
function AppTpl(tag)
{
	
	this.tag=tag;
    this.loading=$(this.data_tag).html();
	this.no_parse=0;

}
/*
window.onpopstate = function(event) {
    
  //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  alert(JSON.stringify(event));
  //$(data.tag).html(Mustache.render(event.state.page, arr_content));
  
};*/
/*
$(window).bind('popstate', function(event) {
    alert(event);
});
*/

AppTpl.prototype.load_view = function(arr_content, template_name) {
	
	data={tag: this.tag, no_parse: this.no_parse};
	
    $.get('tpl/'+template_name+'.mst', data, function(template) {
			
			
			//Load principal 
            
            $(data.tag).html(data.loading);
			
			if(data.no_parse==0)
			{
		
				$(data.tag).html(Mustache.render(template, arr_content));
				
			}
			else
			{
				
				$(data.tag).html(template);
				
			}
            
            //Change page
            /*
            var stateObj = { page: [template_name] };
            
            if(template_name!='index')
            {
            
                history.pushState(stateObj, template_name, "index.html?template="+template_name);
                
            }*/
			
		}).fail(function() {
			
			$(data.tag).html('Error: cannot load the template');
		
		});
    
};

function obtain_get_url(url) {
	
	
	var get={};
	
	var arr_parts_url=url.split('?');
	
	if(typeof arr_parts_url[1] != 'undefined')
	{
		
		arr_items=arr_parts_url[1].split('&');
		
		for(x in arr_items)
		{
			
			//$('body').append(arr_items[x]);
			arr_final=arr_items[x].split('=');
			
			if(typeof arr_final[0] != 'undefined' && typeof arr_final[0] != 'undefined')
			{
			
				key=slugify(arr_final[0]);
				value=slugify(arr_final[1]);
			
				get[key]=value;
				
			}
		
		}
	
	}
    
    return get;
}

function slugify(text, respect_upper, replace_space, replace_dot, replace_barr)
{

	from='àáâãäåæçèéêëìíîïðòóôõöøùúûýþÿŕñÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖØÙÚÛÝỲŸÞŔÑ¿?!¡()"|#*%,;+&ºª<>`çÇ{}@~=^:´[]';
	to=  'aaaaaaaceeeeiiiidoooooouuuybyrnAAAAAACEEEEIIIIDOOOOOOUUUYYYBRN---------------------------------';
	
	if(replace_dot==1)
	{
	
		from+='.';
		to+='-';
	
	}
	
	if(replace_barr==1)
	{
	
		from+="/";
		to+="-";
	
	}

	text=text.replace(/ /g, replace_space);
	
	text=text.trim(text);

	text = strtr(text, from, to);
	
	//Used for pass base64 via GET that use upper, for example.
	
	if(respect_upper==0)
	{
	
		text = text.toLowerCase();
		
	}

	return text; 

}

function strtr(str_in, pat_str, rep_str) {
	
	ret_str='';
	
	arr_dict={};
	
	for(i in pat_str) 
	{
	
		arr_dict[pat_str[i]]=rep_str[i];
	
	}

	for(le in str_in)
	{
	
		if(typeof arr_dict[str_in[le]] != 'undefined')
		{
		
			ret_str+=arr_dict[str_in[le]];
		
		}
		else
		{
		
			ret_str+=str_in[le];
		
		}
		
	}
	
	return ret_str;
}

function check_default_argument(argument, default_value)
{
	
	if(!argument)
	{
		
		return default_value;
		
	}
	
}
