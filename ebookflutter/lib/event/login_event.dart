import 'package:ebookflutter/entity/user_entity.dart';
import 'package:event_bus/event_bus.dart';

EventBus loginEventBus = EventBus();

class LoginEvent {
  bool isLogin;
  UserEntity user;

  LoginEvent(this.isLogin,{this.user});
}
