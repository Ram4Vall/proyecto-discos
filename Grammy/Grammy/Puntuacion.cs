//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Grammy
{
    using System;
    using System.Collections.Generic;
    
    public partial class Puntuacion
    {
        public int Id { get; set; }
        public Nullable<int> Idcliente { get; set; }
        public Nullable<int> iddisco { get; set; }
        public Nullable<int> Puntuacion1 { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
    
        public virtual Cliente Cliente { get; set; }
        public virtual Disco Disco { get; set; }
    }
}
