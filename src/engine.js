import Tone from 'tone';

export const Multiplier = 1;
export const Notes = ["C3", "G3", "B3", "C4", "E3", "D4"];


function randRange(a, b) {
    return a + Math.random() * (b - a);
}

function randMonoSynthConfig () {
    return {
        detune: randRange(-1, 1),
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
            release: randRange(5, 20)
        },
        filterEnvelope: {
            attack: randRange(0.01, 0.20),
            attackCurve: "linear",
            decay: 0.4,
            decayCurve: "exponential",
            sustain: 1.0,
            release: randRange(5, 20),
            releaseCurve: "linear",
            baseFrequency: 20,
            octaves: 5
        }
    };
};


export default class {
    constructor () {
        let len = Notes.length * Multiplier;
        this.synths = Array(len).fill().map(() => new Tone.MonoSynth(randMonoSynthConfig()).toMaster());
    }

    trigger () {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        let schedule = (s) => setTimeout(() => {
            console.log(s, "triggered");
            s.triggerAttackRelease(
                Notes[Math.floor(Math.random() * Notes.length)],
                randRange(.1, .5)
            );
            schedule(s);
        }, randRange(100, 10000));

        this.synths.map(schedule);
    }
}
