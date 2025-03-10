package MyPortfolio.Service;

import MyPortfolio.Entity.User;

public interface UserService {
    public User register(User user);
    public Boolean login(String email,String password);
    public User get(User user);
    public User update(User user);
    public void delete(Long id);
}
