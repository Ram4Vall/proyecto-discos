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
    
    public partial class Disco
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Disco()
        {
            this.DiscoTipoes = new HashSet<DiscoTipo>();
            this.Puntuacions = new HashSet<Puntuacion>();
        }
    
        public int IdDisco { get; set; }
        public string Titulo { get; set; }
        public Nullable<double> Agno { get; set; }
        public Nullable<int> IdInterprete { get; set; }
    
        public virtual Interprete Interprete { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DiscoTipo> DiscoTipoes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Puntuacion> Puntuacions { get; set; }
    }
}
