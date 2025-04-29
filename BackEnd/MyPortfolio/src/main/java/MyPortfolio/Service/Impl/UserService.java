package MyPortfolio.Service.Impl;

import MyPortfolio.Entity.User;

import java.util.Optional;

public interface UserService {
    public User register(User user);
    public Boolean login(String email,String password);
    public User getById(Long id);
    public User update(User user);
    public void delete(Long id);

    public User updateName(String name, Long id);

    public User updatePassword(String pw, Long id);

    User getUserByEmail(String email);
}
