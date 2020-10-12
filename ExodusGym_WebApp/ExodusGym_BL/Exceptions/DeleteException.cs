﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ExodusGym_BL.Exceptions
{
    public class DeleteException : Exception
    {
        public DeleteException()
        {
        }

        public DeleteException(string message) : base(message)
        {
        }

        public DeleteException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected DeleteException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
