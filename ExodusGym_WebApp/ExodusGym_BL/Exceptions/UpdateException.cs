using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ExodusGym_BL.Exceptions
{
    public class UpdateException : Exception
    {
        public UpdateException()
        {
        }

        public UpdateException(string message) : base(message)
        {
        }

        public UpdateException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UpdateException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
