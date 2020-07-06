package com.org.ebook.Repository;

import com.org.ebook.entity.UserAvatar;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserAvatarRepository extends MongoRepository<UserAvatar,Integer> {
}
