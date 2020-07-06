import 'package:ebookflutter/entity/cartlistitem_entity.dart';
import 'package:event_bus/event_bus.dart';

EventBus orderCommitEventBus=EventBus();

class OrderCommitEvent{
  List<Cartlistitem> listdatas;
  OrderCommitEvent(this.listdatas);
}