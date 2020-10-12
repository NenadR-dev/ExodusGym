using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ExodusGym_BL.Exceptions
{
    public class GetException : Exception
    {
        public GetException()
        {
        }

        public GetException(string message) : base(message)
        {
        }

        public GetException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected GetException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
