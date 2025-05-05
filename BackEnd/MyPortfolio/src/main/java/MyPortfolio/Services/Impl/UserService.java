package MyPortfolio.Services.Impl;

import MyPortfolio.Entities.User;
import org.springframework.http.ResponseEntity;

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
