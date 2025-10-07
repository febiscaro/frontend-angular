import 'zone.js/node'; // <<< necessário no SSR (Node)// SSR bootstrap – precisa passar o "context" como 3º argumento
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

export default function bootstrap(context: unknown) {
  return bootstrapApplication(
    AppComponent,
    {
      // reutiliza os providers do app (não importe nada ɵ* aqui)
      providers: [...(appConfig.providers ?? [])],
    },
    // <<< sem isso dá NG0401
    context as any
  );
}
