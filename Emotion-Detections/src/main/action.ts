import { BrowserWindow, ipcMain, dialog, app } from 'electron';
import { PythonShell } from 'python-shell';

export default class ActionsBuilder {
  mainWindow: BrowserWindow;

  appData: string;

  listMessage!: Array<any>;

  pyshell: any;

  pythProcess: any;

  constructor(
    mainWindow: BrowserWindow,
    appData: string,
    listMessage: Array<any>,
    pyshell: Object,
    pythProcess: Object
  ) {
    this.mainWindow = mainWindow;
    this.appData = appData;
    this.listMessage = listMessage;
    this.pyshell = pyshell;
    this.pythProcess = pythProcess;
  }

  initEvents = () => {
    ipcMain.on('toggle_PythonScripts', async (event, data) => {

      if (data === true) {
        this.pyshell = new PythonShell(
          'E:/Minor Project/Emotion-Detections/src/main/Emotion_Detection/main.py'
        );

        this.pythProcess = this.pyshell.childProcess;
        this.pyshell.on('message', function (message: any) {
          this.listMessage = [
            'Angry',
            'Disgust',
            'Fear',
            'Happy',
            'Neutral',
            'Sad',
            'Surprise',
          ];

          if (this.listMessage.includes(message)) {
            console.log(message);
          }
        });

        this.pyshell.end(function (err: unknown) {
          if (err) {
            throw err;
          }
          console.log('finished');
        });

        console.log('Started.');
      } else {
        this.pythProcess.kill('SIGINT');
        // console.log(pythProcess)
      }
    });
  };
}
