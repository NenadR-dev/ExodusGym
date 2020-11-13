using ExodusGym_DAL.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ExodusGym_DAL.Repository
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        internal DbSet<TEntity> DbSet { get; set; }
        internal AppDbContext Context { get; set; }

        public BaseRepository(AppDbContext _context)
        {
            Context = _context;
            DbSet = _context.Set<TEntity>();
        }

        public TEntity Add(TEntity entity)
        {
            DbSet.Add(entity);
            return entity;
        }

        public TEntity Delete(TEntity entity)
        {
            if (Context.Entry(entity).State == EntityState.Detached)
                DbSet.Attach(entity);
            DbSet.Remove(entity);
            return entity;
        }

        public TEntity Delete(int ID)
        {
            TEntity entity = DbSet.Find(ID);
            DbSet.Remove(entity);
            return entity;
        }

        public IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "")
        {
            IQueryable<TEntity> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }


            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public TEntity GetByID(int ID)
        {
            return DbSet.Find(ID);
        }

        public TEntity Update(TEntity entity)
        {
            DbSet.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public IEnumerable<TEntity> GetAll()
        {
            return DbSet.ToList();
        }
    }
}
