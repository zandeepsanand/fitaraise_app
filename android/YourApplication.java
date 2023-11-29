import android.app.Application;
import com.google.firebase.FirebaseApp;

public class YourApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        FirebaseApp.initializeApp(this);
        // Other initialization code if needed
    }
}
