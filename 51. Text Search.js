export default function textSearch(string, query) {
    let array = []; 
    let regex = new RegExp(query); 
    let str = string.toLowerCase();
    let matches = str.matchAll(query.toLowerCase());
    
    if(!query) {
      return string;
    }
    let i = 0;
    
    for(const match of matches) {
        array.push(string.substring(i, match.index));
        array.push("<b>"+string.substring(match.index, match.index + query.length)+"</b>");
        i = match.index + query.length;
    }
    
    array.push(string.substring(i));
    
    return array.join("");

}
