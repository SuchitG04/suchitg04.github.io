---
title: "Gippity: Experiments worklog"
toc: true
date: "2025-03-28"
author: Suchit G
description: A log of experiments performed while working on Gippity.
categories:
    - Research
    - Experiments
---

**Dataset**: [fineweb_sample_10B_np_bin](https://huggingface.co/datasets/asquirous/fineweb_sample_10B_np_bin)

## Expt. 1: Baseline

The goal of this experiment was to establish a baseline to compare performance of subsequent experiments. This experiment was run on a L4 GPU on lightning.ai.

![Baseline Train Loss Curve (3.7580)](./assets/gippity_baseline.png)
![Baseline Val Loss Curve (3.7822)](./assets/gippity_baseline_val.png)

### Highlights
- ~35.6M parameter model.
- trained on ~1B tokens from the fineweb dataset.
- nothing fancy. Made little to no modifications to the original nanoGPT code.

**NB 1**: [Code repo](https://github.com/SuchitG04/gippity/tree/master)

**NB 2**: [Wandb run](https://wandb.ai/suchitg04/gippity/runs/k4aj5xe6/overview)

### Config
- **Model Architecture**:
  - `n_embd`: 512 
  - `n_head`: 8 
  - `n_layer`: 6 
  - `block_size`: 1024 
  - `bias`: false 
  - `dropout`: 0 (no dropout)

- **Optimizer**:
  - `learning_rate`: 0.0006
  - `min_lr`: 0.00006
  - `beta1`: 0.9
  - `beta2`: 0.95
  - `weight_decay`: 0.1
  - `grad_clip`: 1
  - `gradient_accumulation_steps`: 16
- **Learning Rate Schedule**:
  - `decay_lr`: true
  - `warmup_iters`: 100
  - `lr_decay_iters`: 2000
- **Training Duration**:
  - `max_iters`: 2000
  - `batch_size`: 32
  - `eval_interval`: 40
  - `eval_iters`: 50

- **Misc**:
  - `device`: "cuda" 
  - `dtype`: "bfloat16" 
  - `backend`: "nccl" 
  - `compile`: true 

- **Logging**:
  - `wandb_log`: true
  - `wandb_project`: "gippity"
  - `wandb_run_name`: "gippity-chinchilla-baseline"


## Expt. 2: 

We use Rotary Positional embeddings in place of learned positional embeddings and RMSNorm in place of LayerNorm. 

![RoPE+RMSNorn Train Loss Curve (3.6428)](./assets/gippity_ropermsnorm_train.png)
![RoPE+RMSNorn Val Loss Curve (3.6436)](./assets/gippity_ropermsnorm_val.png)

### Highlights
- shows better loss than baseline (converges faster).
- reduced VRAM usage due to removal of learned positional embeddings.
- hence the batch size can be increased and gradient accumulation steps decreased.
- faster training due to lesser parameters and lower gradient accumulation steps.

### References
- [You could have designed state of the art positional encoding](https://huggingface.co/blog/designing-positional-encoding)
- [Rotary Embeddings: A Relative Revolution](https://blog.eleuther.ai/rotary-embeddings/)
- [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/pdf/2104.09864)

**NB 1**: [Code repo](https://github.com/SuchitG04/gippity/tree/rope)

**NB 2**: [Wandb run](https://wandb.ai/suchitg04/gippity/runs/ysitmtuv/overview)

### Config
- **Model Architecture**:
  - `n_embd`: 512
  - `n_head`: 8
  - `n_layer`: 6
  - `block_size`: 1024
  - `bias`: false
  - `dropout`: 0 (no dropout)

- **Optimizer**:
  - `learning_rate`: 0.0006
  - `min_lr`: 0.00006
  - `beta1`: 0.9
  - `beta2`: 0.95
  - `weight_decay`: 0.1
  - `grad_clip`: 1
  - `gradient_accumulation_steps`: 8

- **Learning Rate Schedule**:
  - `decay_lr`: true
  - `warmup_iters`: 100
  - `lr_decay_iters`: 2000

- **Training Duration**:
  - `max_iters`: 2000
  - `batch_size`: 64
  - `eval_interval`: 40
  - `eval_iters`: 50

- **Misc**:
  - `device`: "cuda"
  - `dtype`: "bfloat16"
  - `backend`: "nccl"
  - `compile`: true

- **Logging**:
  - `wandb_log`: true
  - `wandb_project`: "gippity"
  - `wandb_run_name`: "gippity-rope-rmsnorm"
