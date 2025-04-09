package MyPortfolio.Service;

import MyPortfolio.Entity.User;

import java.util.Optional;

public interface UserService {
    public User register(User user);
    public Boolean login(String email,String password);
    public User getById(Long id);
    public User update(User user);
    public void delete(Long id);

    User getUserByEmail(String email);
}
