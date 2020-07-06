package com.org.ebook.Repository;

import com.org.ebook.entity.Address;
import com.org.ebook.entity.AddressID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, AddressID> {
    @Query("select a from Address a where a.u_id=:u_id")
    List<Address> findByUser_id(@Param("u_id") Integer u_id);
    @Query("select a from Address a where a.u_id=:u_id and a.addr_id=:a_id")
    Address findByUser_idAndAddress_id(@Param("u_id")Integer u_id,@Param("a_id")Integer a_id);
    @Query("select a from Address a where  a.addr_id=:a_id")
    Address findByUser_idAndAddress_id(@Param("a_id")Integer a_id);
}
