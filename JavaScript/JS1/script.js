function tabuada()
{
  var nome = "c";
  var n = 1;
  for (i = 1; i<=10; i++)
  {
    var string = "<div id =" + nome + n + ">";

    string += "<table><tr><th colspan = '2'>Produtos de "+ i + "</th></tr>";

        for (j=1; j<=10; j++)
        {
            string += "<tr><td>";
            string += i + " x " + j +  "\n";
            string += "</td><td>"+(j*i)+"</td></tr>";
        }
        string+="</table></div>";
        n++;
        document.write(string);
    }
}
