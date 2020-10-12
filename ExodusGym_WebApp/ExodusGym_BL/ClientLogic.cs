//using ExodusGym_BL.Exceptions;
//using ExodusGym_DAL;
//using ExodusGym_DAL.Model;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Reflection;
//using System.Text;

//namespace ExodusGym_BL
//{
//    public class ClientLogic
//    {
//        private readonly IUnitOfWork _unitOfWork;
//        public ClientLogic(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public Client AddClient(Client data)
//        {
//            try
//            {
//                var ret_data = _unitOfWork.Client.Add(data);
//                _unitOfWork.Commit();
//                return ret_data;
//            }
//            catch (Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
//                throw new AddException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//        public Client RemoveClient(Client data)
//        {
//            try
//            {
//                var ret_data = _unitOfWork.Client.Delete(data);
//                _unitOfWork.Commit();
//                return ret_data;
//            }
//            catch(Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
             
//                throw new DeleteException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//        public Client RemoveClient(int id)
//        {
//            try
//            {
//                var data = _unitOfWork.Client.GetByID(id);
//                var ret_data = _unitOfWork.Client.Delete(data);
//                _unitOfWork.Commit();
//                return ret_data;
//            }
//            catch(Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
//                throw new DeleteException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//        public Client UpdateClient(Client data)
//        {
//            try
//            {
//                var target = _unitOfWork.Client.Get(x => x.Username == data.Username && x.Password == data.Password).First();
//                var ret_data = _unitOfWork.Client.Update(target);
//                _unitOfWork.Commit();
//                return ret_data;
//            }
//            catch (Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
//                throw new UpdateException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//        public Client GetClient(Client data)
//        {
//            try
//            {
//                return _unitOfWork.Client.Get(x=> x.Username == data.Username && x.Password == data.Password).First();
//            }
//            catch (Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
//                throw new GetException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//        public IEnumerable<Client> ListClients()
//        {
//            try
//            {
//                return _unitOfWork.Client.Get(x=> x.Username != string.Empty);
//            }
//            catch (Exception e)
//            {
//                MethodBase methodBase = MethodBase.GetCurrentMethod();
//                throw new GetException($"Error occured in: {methodBase.ReflectedType.Name}.{methodBase.Name}. {e.Message}");
//            }
//        }
//    }
//}
