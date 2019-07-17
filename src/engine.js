import Tone from 'tone';

export const N = 5;
export const Notes = ["C", "G", "B", "E", "D"];


function randRange(a, b) {
    return a + Math.random() * (b - a);
}

function randInt(a, b) {
    return Math.floor(randRange(a, b));
}

function randMonoSynthConfig () {
    return {
        detune: randInt(-10, 10),
        oscillator: {
            type: "sawtooth"
        },
        filter: {
            type: "bandpass",
            rolloff: -24,
            Q: randRange(1, 4)
        },
        envelope: {
            attack: randRange(0.01, 0.10),
            decay: 0.10,
            sustain: 0.20,
            release: randRange(10, 20)
        },
        filterEnvelope: {
            attack: randRange(0.01, 0.10),
            attackCurve: "linear",
            decay: 0.4,
            decayCurve: "exponential",
            sustain: 1.0,
            release: randRange(5, 30),
            releaseCurve: "linear",
            baseFrequency: 20,
            octaves: 5
        }
    };
};


export default class {
    constructor () {
        this.synths = Array(N).fill().map(() => new Tone.MonoSynth(randMonoSynthConfig()).toMaster());
    }

    trigger () {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        let schedule = (s) => setTimeout(() => {
            console.log(s, "triggered");
            let note = Notes[Math.floor(Math.random() * Notes.length)];
            let octave = randInt(2, 5);
            s.triggerAttackRelease(
                note + octave,
                randRange(.1, 1)
            );
            schedule(s);
        }, randRange(100, 10000));

        this.synths.map(schedule);
    }
}
