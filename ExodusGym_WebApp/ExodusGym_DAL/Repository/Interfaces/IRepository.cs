using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ExodusGym_DAL.Repository.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Delete(TEntity entity);
        TEntity Delete(int ID);
        IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");
        TEntity GetByID(int ID);
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
    }
}
