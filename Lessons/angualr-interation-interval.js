import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

//Code Snippet for Angular iteration with "interval"
  //Written by Kihun. H

  public FunctionA():void {
    //... Some action/init

    //Set time interval how often
    this.timer = interval(3000);

    //With using "takeWhile", so set condition to act defined function (Ex. functionB) till condition is false
    this.timer.pipe(
      takeWhile( () => this.condition == true )
    ).subscribe(() => this.FunctionB())
  }

  private FunctionB(): void {
    //..Some action to be interated until condition meet
  }