import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

type InterviewSetup = {
  interviewType?: string;
  difficulty?: string;
  experience?: string;
};

type SpeechRecognitionEventLike = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEventLike = Event & {
  error: string;
};

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult:
    | ((event: SpeechRecognitionEventLike) => void)
    | null;
  onerror:
    | ((event: SpeechRecognitionErrorEventLike) => void)
    | null;
}

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const QUESTIONS = [
  "Tell me about yourself.",
  "Why should we hire you for this role?",
  "Explain one of your projects and the technologies you used.",
  "What is your biggest technical strength?",
  "Where do you see yourself in the next three years?",
];

const TIPS = [
  "Speak clearly and confidently.",
  "Structure your answers logically.",
  "Give examples when possible.",
  "Avoid rushing your answers.",
];

function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const setup =
    (location.state as InterviewSetup | null) || {};

  /* -------------------------------------------------
     QUESTION STATE
  ------------------------------------------------- */

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<string[]>(
    () => QUESTIONS.map(() => "")
  );

  /* -------------------------------------------------
     TIMER
  ------------------------------------------------- */

  const [seconds, setSeconds] = useState(0);

  /* -------------------------------------------------
     RECORDING STATE
  ------------------------------------------------- */

  const [isRecording, setIsRecording] =
    useState(false);

  const [recordingError, setRecordingError] =
    useState("");

  const [audioUrls, setAudioUrls] = useState<
    (string | null)[]
  >(() => QUESTIONS.map(() => null));

  /* -------------------------------------------------
     SPEECH RECOGNITION STATE
  ------------------------------------------------- */

  const [isListening, setIsListening] =
    useState(false);

  const [speechSupported, setSpeechSupported] =
    useState(true);

  const [speechError, setSpeechError] =
    useState("");

  /*
   * IMPORTANT:
   *
   * finalTranscriptRef contains only the speech detected
   * during the CURRENT recording session.
   *
   * We do NOT repeatedly append the complete result list.
   *
   * This prevents:
   *
   * "My name is Yash My name is Yash My name is Yash..."
   */

  const finalTranscriptRef = useRef("");

  const recordingBaseAnswerRef = useRef("");

  const recognitionRef =
    useRef<SpeechRecognitionLike | null>(null);

  const recognitionShouldContinueRef =
    useRef(false);

  /* -------------------------------------------------
     MEDIA RECORDER STATE
  ------------------------------------------------- */

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const audioChunksRef =
    useRef<Blob[]>([]);

  /* -------------------------------------------------
     QUESTION REF
  ------------------------------------------------- */

  const currentQuestionRef =
    useRef(currentQuestion);

  useEffect(() => {
    currentQuestionRef.current =
      currentQuestion;
  }, [currentQuestion]);

  /* -------------------------------------------------
     TIMER
  ------------------------------------------------- */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* -------------------------------------------------
     FORMAT TIMER
  ------------------------------------------------- */

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(
      totalSeconds / 60
    );

    const remainingSeconds =
      totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* -------------------------------------------------
     UPDATE ANSWER
  ------------------------------------------------- */

  const updateAnswer = (value: string) => {
    setAnswers((previous) => {
      const updated = [...previous];

      updated[currentQuestion] = value;

      return updated;
    });
  };

  /* -------------------------------------------------
     FIND SUPPORTED RECORDING FORMAT
  ------------------------------------------------- */

  const getSupportedMimeType = () => {
    if (
      typeof MediaRecorder === "undefined"
    ) {
      return "";
    }

    const mimeTypes = [
      "audio/mp4",
      'audio/mp4;codecs="mp4a.40.2"',
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
    ];

    for (const type of mimeTypes) {
      try {
        if (
          MediaRecorder.isTypeSupported(type)
        ) {
          return type;
        }
      } catch {
        // Continue checking the next format.
      }
    }

    return "";
  };

  /* -------------------------------------------------
     STOP SPEECH RECOGNITION
  ------------------------------------------------- */

  const stopSpeechRecognition = useCallback(() => {
    recognitionShouldContinueRef.current =
      false;

    const recognition =
      recognitionRef.current;

    if (!recognition) {
      return;
    }

    try {
      recognition.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
  }, []);

  /* -------------------------------------------------
     STOP MEDIA RECORDER
  ------------------------------------------------- */

  const stopMediaRecorder = useCallback(() => {
    const recorder =
      mediaRecorderRef.current;

    if (!recorder) {
      return;
    }

    try {
      if (
        recorder.state !== "inactive"
      ) {
        recorder.stop();
      }
    } catch {
      // Recorder may already have stopped.
    }
  }, []);

  /* -------------------------------------------------
     RELEASE MICROPHONE
  ------------------------------------------------- */

  const releaseMicrophone = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      mediaStreamRef.current = null;
    }
  }, []);

  /* -------------------------------------------------
     START SPEECH RECOGNITION
  ------------------------------------------------- */

  const startSpeechRecognition =
    useCallback(() => {
      const SpeechRecognitionClass =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognitionClass) {
        setSpeechSupported(false);
        setSpeechError(
          "Speech-to-text is not supported in this browser."
        );
        return;
      }

      setSpeechSupported(true);
      setSpeechError("");

      const recognition =
        new SpeechRecognitionClass();

      recognitionRef.current =
        recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (
        event
      ) => {
        let sessionFinal = "";
        let sessionInterim = "";

        /*
         * Process only the current event.
         *
         * Do NOT append event.results repeatedly.
         * That is what caused the duplicated words.
         */

        for (
          let i = event.results.length - 1;
          i >= 0;
          i--
        ) {
          const result = event.results[i];

          const transcript =
            result[0].transcript;

          if (result.isFinal) {
            sessionFinal =
              transcript + " " + sessionFinal;
          } else {
            sessionInterim =
              transcript + sessionInterim;
          }
        }

        sessionFinal =
          sessionFinal.trim();

        sessionInterim =
          sessionInterim.trim();

        if (sessionFinal) {
          finalTranscriptRef.current =
            `${finalTranscriptRef.current} ${sessionFinal}`.trim();
        }

        const base =
          recordingBaseAnswerRef.current;

        const completeAnswer =
          `${base} ${finalTranscriptRef.current} ${sessionInterim}`
            .replace(/\s+/g, " ")
            .trim();

        updateAnswer(completeAnswer);
      };

      recognition.onerror = (
        event
      ) => {
        console.error(
          "Speech recognition error:",
          event.error
        );

        setIsListening(false);

        if (
          event.error === "not-allowed"
        ) {
          setSpeechError(
            "Microphone permission was denied. Please allow microphone access."
          );
        } else if (
          event.error === "no-speech"
        ) {
          /*
           * This is not a fatal error.
           * Safari/Chrome can report this when
           * there is a pause in speaking.
           */
        } else if (
          event.error === "audio-capture"
        ) {
          setSpeechError(
            "The microphone could not be accessed."
          );
        } else if (
          event.error === "network"
        ) {
          setSpeechError(
            "Speech recognition needs a network connection."
          );
        } else {
          setSpeechError(
            `Speech recognition error: ${event.error}`
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);

        /*
         * Some browsers automatically stop recognition.
         *
         * Restart only while the user is still recording.
         */

        if (
          recognitionShouldContinueRef.current
        ) {
          window.setTimeout(() => {
            if (
              recognitionShouldContinueRef.current
            ) {
              try {
                recognition.start();
              } catch {
                // Already running or browser rejected restart.
              }
            }
          }, 200);
        }
      };

      recognitionShouldContinueRef.current =
        true;

      try {
        recognition.start();
      } catch (error) {
        console.error(
          "Could not start speech recognition:",
          error
        );

        setIsListening(false);

        setSpeechError(
          "Could not start speech recognition."
        );
      }
    }, [currentQuestion]);

  /* -------------------------------------------------
     START RECORDING
  ------------------------------------------------- */

  const startRecording = async () => {
    if (isRecording) {
      return;
    }

    setRecordingError("");
    setSpeechError("");

    /*
     * Remember what was already written.
     *
     * If the user already answered part of the question
     * and presses record again, new speech is appended
     * exactly once.
     */

    const existingAnswer =
      answers[currentQuestion].trim();

    recordingBaseAnswerRef.current =
      existingAnswer;

    finalTranscriptRef.current = "";

    audioChunksRef.current = [];

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Microphone access is not supported."
        );
      }

      /*
       * Ask for microphone permission.
       */

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      mediaStreamRef.current =
        stream;

      /*
       * Try to create MediaRecorder.
       *
       * If recording is not supported,
       * speech-to-text can still continue.
       */

      if (
        typeof MediaRecorder !==
        "undefined"
      ) {
        const mimeType =
          getSupportedMimeType();

        let recorder: MediaRecorder;

        try {
          recorder = mimeType
            ? new MediaRecorder(
                stream,
                { mimeType }
              )
            : new MediaRecorder(stream);
        } catch (error) {
          console.error(
            "MediaRecorder creation failed:",
            error
          );

          recorder =
            new MediaRecorder(stream);
        }

        mediaRecorderRef.current =
          recorder;

        recorder.ondataavailable = (
          event
        ) => {
          if (
            event.data &&
            event.data.size > 0
          ) {
            audioChunksRef.current.push(
              event.data
            );
          }
        };

        recorder.onerror = (event) => {
          console.error(
            "MediaRecorder error:",
            event
          );

          setRecordingError(
            "Audio recording encountered an error. Speech-to-text can still continue."
          );
        };

        recorder.onstop = () => {
          const chunks =
            audioChunksRef.current;

          if (chunks.length === 0) {
            return;
          }

          const actualMimeType =
            recorder.mimeType ||
            mimeType ||
            "audio/mp4";

          const blob = new Blob(
            chunks,
            {
              type: actualMimeType,
            }
          );

          if (blob.size === 0) {
            return;
          }

          const url =
            URL.createObjectURL(blob);

          setAudioUrls((previous) => {
            const updated = [...previous];

            /*
             * Revoke old URL to prevent memory leaks.
             */

            if (
              updated[currentQuestion]
            ) {
              URL.revokeObjectURL(
                updated[currentQuestion]!
              );
            }

            updated[currentQuestion] =
              url;

            return updated;
          });
        };

        try {
          recorder.start(250);
        } catch (error) {
          console.error(
            "Recorder start failed:",
            error
          );

          setRecordingError(
            "Audio recording is unavailable in this browser."
          );
        }
      } else {
        setRecordingError(
          "Audio recording is not supported in this browser."
        );
      }

      /*
       * Start speech recognition separately.
       */

      startSpeechRecognition();

      setIsRecording(true);
    } catch (error) {
      console.error(
        "Microphone error:",
        error
      );

      setRecordingError(
        "Could not access your microphone. Please allow microphone access in Safari."
      );

      releaseMicrophone();
    }
  };

  /* -------------------------------------------------
     STOP RECORDING
  ------------------------------------------------- */

  const stopRecording = () => {
    recognitionShouldContinueRef.current =
      false;

    stopSpeechRecognition();
    stopMediaRecorder();

    /*
     * Release microphone shortly after recorder
     * receives its final data.
     */

    window.setTimeout(() => {
      releaseMicrophone();
    }, 100);

    setIsRecording(false);
  };

  /* -------------------------------------------------
     MOVE TO QUESTION
  ------------------------------------------------- */

  const goToQuestion = (
    questionIndex: number
  ) => {
    if (
      questionIndex < 0 ||
      questionIndex >= QUESTIONS.length
    ) {
      return;
    }

    if (isRecording) {
      stopRecording();
    }

    setCurrentQuestion(
      questionIndex
    );

    /*
     * Reset only temporary speech-session state.
     *
     * The actual answer remains in `answers`.
     */

    finalTranscriptRef.current = "";
    recordingBaseAnswerRef.current =
      "";
    setSpeechError("");
  };

  /* -------------------------------------------------
     NEXT QUESTION
  ------------------------------------------------- */

  const handleNextQuestion = () => {
    if (
      currentQuestion <
      QUESTIONS.length - 1
    ) {
      goToQuestion(
        currentQuestion + 1
      );
    }
  };

  /* -------------------------------------------------
     FINISH INTERVIEW
  ------------------------------------------------- */

  const finishInterview = () => {
    if (isRecording) {
      stopRecording();
    }

    /*
     * Give React a moment to finish the final
     * transcript update before navigating.
     */

    window.setTimeout(() => {
      navigate("/results", {
        state: {
          questions: QUESTIONS,
          answers,
          interviewType:
            setup.interviewType ||
            "Frontend Developer",
          difficulty:
            setup.difficulty ||
            "Medium",
          experience:
            setup.experience ||
            "Fresher",
          duration: seconds,
        },
      });
    }, 150);
  };

  /* -------------------------------------------------
     CLEANUP
  ------------------------------------------------- */

  useEffect(() => {
    return () => {
      recognitionShouldContinueRef.current =
        false;

      try {
        recognitionRef.current?.abort();
      } catch {
        // Ignore cleanup errors.
      }

      try {
        const recorder =
          mediaRecorderRef.current;

        if (
          recorder &&
          recorder.state !== "inactive"
        ) {
          recorder.stop();
        }
      } catch {
        // Ignore cleanup errors.
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }

      audioUrls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  /* -------------------------------------------------
     CURRENT DATA
  ------------------------------------------------- */

  const currentAnswer =
    answers[currentQuestion];

  const currentAudio =
    audioUrls[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      QUESTIONS.length) *
    100;

  const isLastQuestion =
    currentQuestion ===
    QUESTIONS.length - 1;

  /* -------------------------------------------------
     UI
  ------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Progress */}
      <div className="h-2 bg-slate-800">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          InterviewAI 🚀
        </Link>

        <div className="text-sm text-slate-400">
          {setup.interviewType ||
            "Frontend Developer"}{" "}
          •{" "}
          {setup.difficulty ||
            "Medium"}
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          {/* Label */}
          <p className="text-sm font-medium text-blue-400">
            AI Interviewer
          </p>

          {/* Question */}
          <h1 className="mt-5 text-4xl font-bold leading-tight">
            {QUESTIONS[currentQuestion]}
          </h1>

          <p className="mt-5 text-lg text-slate-400">
            Take your time and provide a
            clear, structured answer.
          </p>

          {/* Answer */}
          <div className="mt-10">
            <label className="text-sm font-semibold text-slate-300">
              Your Answer
            </label>

            <textarea
              value={currentAnswer}
              onChange={(event) =>
                updateAnswer(
                  event.target.value
                )
              }
              placeholder="Type your answer here or use Start Recording..."
              className="mt-4 min-h-[260px] w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-5 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Errors */}
          {(recordingError ||
            speechError) && (
            <div className="mt-4 rounded-lg border border-amber-800 bg-amber-950/30 p-4 text-sm text-amber-300">
              {recordingError ||
                speechError}
            </div>
          )}

          {!speechSupported && (
            <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4 text-sm text-slate-400">
              Speech-to-text is not
              available in this browser.
              You can still type your
              answer manually.
            </div>
          )}

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={
                isRecording
                  ? stopRecording
                  : startRecording
              }
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {isRecording
                ? "⏹ Stop Recording"
                : "🎙️ Start Recording"}
            </button>

            <button
              type="button"
              onClick={
                isLastQuestion
                  ? finishInterview
                  : handleNextQuestion
              }
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700"
            >
              {isLastQuestion
                ? "✅ Finish Interview"
                : "Next Question →"}
            </button>
          </div>

          {/* Listening indicator */}
          {isListening && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-blue-900 bg-blue-950/40 p-4 text-sm text-blue-300">
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
              Listening... Your speech is
              being converted to text.
            </div>
          )}

          {/* Recording */}
          <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-5">
            <div className="flex items-center gap-3">
              <span className="text-xl">
                🎧
              </span>

              <div>
                <h2 className="font-semibold">
                  Your Recording
                </h2>

                <p className="text-sm text-slate-400">
                  {isRecording
                    ? "Recording in progress..."
                    : currentAudio
                    ? "Recording ready to play"
                    : "No recording for this question yet"}
                </p>
              </div>
            </div>

            {currentAudio && (
              <audio
                key={currentAudio}
                controls
                preload="metadata"
                src={currentAudio}
                className="mt-4 w-full"
                onError={() => {
                  setRecordingError(
                    "The recording was created, but this browser could not play the audio format."
                  );
                }}
              />
            )}
          </div>
        </section>

        {/* RIGHT */}
        <aside className="space-y-6">
          {/* Timer */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <p className="text-slate-400">
              Interview Time
            </p>

            <p className="mt-2 text-5xl font-bold">
              {formatTime(seconds)}
            </p>

            <p className="mt-2 text-slate-500">
              Interview duration
            </p>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="text-xl font-bold">
              💡 Interview Tips
            </h2>

            <div className="mt-5 space-y-4 text-slate-400">
              {TIPS.map((tip) => (
                <p key={tip}>
                  • {tip}
                </p>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="text-xl font-bold">
              Questions
            </h2>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {QUESTIONS.map(
                (_, index) => {
                  const answered =
                    answers[index].trim()
                      .length > 0;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        goToQuestion(
                          index
                        )
                      }
                      className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                        currentQuestion ===
                        index
                          ? "bg-blue-600 text-white"
                          : answered
                          ? "bg-green-900 text-green-300"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-5 text-sm text-slate-500">
              {answers.filter(
                (answer) =>
                  answer.trim()
                    .length > 0
              ).length}{" "}
              of {QUESTIONS.length}{" "}
              questions answered
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default InterviewPage;