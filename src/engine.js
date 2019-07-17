import Tone from 'tone';

export const N = 5;
export const Notes = ["C", "G", "B", "E", "D"];
export const DefaultGain = 5;


function randRange (a, b) {
    return a + Math.random() * (b - a);
}

function randInt (a, b) {
    return Math.floor(randRange(a, b));
}

function randMonoSynthConfig () {
    return {
        oscillator: {
            type: "sawtooth",
            detune: randRange(-5, 5)
        },
        filter: {
            type: "bandpass",
            rolloff: -24,
            Q: randRange(1, 4)
        },
        envelope: {
            attack: randRange(0.01, 1),
            decay: 0.10,
            sustain: 0.20,
            release: randRange(10, 20)
        },
        filterEnvelope: {
            attack: randRange(0.01, 1),
            attackCurve: "linear",
            decay: 0.4,
            decayCurve: "exponential",
            sustain: 1.0,
            release: randRange(5, 30),
            releaseCurve: "linear",
            baseFrequency: 20,
            octaves: randInt(2, 5)
        }
    };
};

function randHarmonicity (a, b, c) {
    return Math.pow(2, randInt(a, b)) + c * Math.random();
}

function randDuoSynthConfig () {
    return {
        vibratoAmount: randRange(0.01, 0.5),
        vibratoRate: randRange(.1, 1),
        harmonicity: randHarmonicity(-1, 3, 0.01),
        voice0: randMonoSynthConfig(),
        voice1: randMonoSynthConfig()
    };
};


export default class {
    constructor () {
        this.synths = Array(N).fill().map(() => {
            let config = randDuoSynthConfig();
            let synth = new Tone.DuoSynth(config);
            let gain = new Tone.Gain(DefaultGain);
            synth.connect(gain);
            gain.toMaster();
            return synth;
        });
    }

    setVolume (vol) {
        
    }

    trigger () {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        let schedule = (s) => setTimeout(() => {
            let note = Notes[Math.floor(Math.random() * Notes.length)];
            let octave = randInt(2, 5);
            s.triggerAttackRelease(
                note + octave,
                randRange(.1, 1)
            );
            schedule(s);
        }, randRange(1000, 10000));

        this.synths.map(schedule);
    }
}
