using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Grammy.Controllers
{
    public class TopController : ApiController
    {
        [HttpGet]
        public string getTop()
        {
            using (SqlConnection connection = new SqlConnection("Persist Security Info=False;Integrated Security=SSPI;Initial Catalog=Discos;server=(local) "))
            {
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * from MejoresPuntuaciones";

                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        string jsonSer = "";
                        //ArrayList aList = new ArrayList();
                        int auxCont = 0;
                        while (reader.Read())
                        {
                            if(auxCont < 4)
                            {
                                jsonSer += "{\"Titulo\": \"" + reader.GetString(0) + "\", \"Puntuacion\": \"" + reader.GetSqlInt32(1) + "\"},";
                            }else
                            {
                                jsonSer += "{\"Titulo\": \"" + reader.GetString(0) + "\", \"Puntuacion\": \"" + reader.GetSqlInt32(1) + "\"}";
                            }
                            auxCont++;
                        }
                        jsonSer = "[" + jsonSer + "]";
                        //aux.Add(jsonSer);

                        //JObject json = JObject.Parse(jsonSer);
                        //aList.Add(jsonSer);
                        //var json = JsonConvert.SerializeObject(jsonSer);
                        return jsonSer;
                    }
                }
            }
        }
    }
}
